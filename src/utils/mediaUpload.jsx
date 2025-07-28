import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjc3FoanlyaG51dm9pY3d2Y3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NzIyMDUsImV4cCI6MjA2OTI0ODIwNX0.Q-I9iXgxmyPuPzgTyM0PFc0t0LlWg6FliTosnLhEm2g"
const superbase_url = "https://rcsqhjyrhnuvoicwvcxu.supabase.co"

const superbase = createClient(superbase_url , anon_key)

export default function mediaUpload(file)
{
    return new Promise((resolve , reject)=>{
        if(file==null)
        {
            reject("No files selected")
        }
        const timestamp = new Date().getTime();
        const filename = timestamp + file.name

        superbase.storage.from("images").upload(filename,file,{
            cacheControl:'3600',
            upsert: false,
        }).then(()=>{

            const publicUrl = superbase.storage.from("images").getPublicUrl(filename).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file")
        })
    });   
    
} 