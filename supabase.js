const { createClient } = require('@supabase/supabase-js');
const dotenv = require("dotenv");
dotenv.config();
const supabase = createClient(process.env.ANON_URL, process.env.ANON_KEY)
module.exports = supabase;