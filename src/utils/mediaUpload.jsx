import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dmNtY3Bmc2h5dXl5aHFta2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NTU5NDQsImV4cCI6MjA1NjAzMTk0NH0.9EnwYWaUs6pgFlnqsErWZUa-8sZk1Rurv96IhQwPtDM"
const superbase_url = "https://wyvcmcpfshyuyyhqmkeo.supabase.co"

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