const supabase = require("./supabase");
const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;

async function getDataPerusahaan() {
    const { data: DataPerusahaan } = await supabase.from('nama_perusahaan').select("*");
    return DataPerusahaan;
}

const embeddingData = async (text) => {
    const res = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
    });

    const embedding = await res.json(); // hasil vector
    return embedding;
}

async function insertVector() {
    try {
        const dataPerusahaan = await getDataPerusahaan();
        for (const item of dataPerusahaan) {
            const embedding = await embeddingData(item.nama);
            if (!embedding) continue;

            // insert data
            const { error } = await supabase.from("nama_biner").insert([
                {
                    nama_perusahaan: item.nama,
                    embedding: embedding,
                },
            ]);

            if (error) {
                console.error("Insert error:", error);
            } else {
                console.log(`✅ ${item.nama} berhasil dimasukkan`);
            }

        }

        console.log(dataPerusahaan);


    } catch (error) {
        console.log(error);
    }
}

// insertVector();

const threshold = 1.9

// uji coba pencarian data
async function handleInputUser(req, res) {
    const text = req.body.query;
    console.log(text);
    
    const inputEmbedding = await embeddingData(text);
    const { data, error } = await supabase.rpc('search_by_embedding', {
        embedding_input: inputEmbedding
    });
    if (error) {
        console.error("Insert error:", error);
    } else {
        const filteredData = data.filter(item => item.similarity >= threshold)
        if (filteredData.length > 0) {
            console.log("Tidak bisa mengajukan nama perusahaan yang sama");
            res.json("Tidak bisa mengajukan nama perusahaan yang sama")
        } else {
            console.log("Data pengajuan baru ditambahkan");
            res.json("Data pengajuan baru ditambahkan");

        }
    }
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/api/search', handleInputUser)


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});