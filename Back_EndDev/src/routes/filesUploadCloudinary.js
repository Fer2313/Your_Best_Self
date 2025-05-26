import { postImageFile } from "../handlers/filesUploadCloudinary.js"

export async function postImageFileRoute(req,res){
    try {
      await postImageFile(req,res);
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
}