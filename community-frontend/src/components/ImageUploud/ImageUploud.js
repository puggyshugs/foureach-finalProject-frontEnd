import {useState} from 'react';

function ImageUpload(){

    const[image, setImage] = useState('');
    const[loading, setLoading] = useState(false)

    async uploadImage(e){
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'imageupload')
        setLoading(true);
        const res=await fetch('https://api.cloudinary.com/v1_1/dmxpnf9fs/image/upload',
        {
            method: 'POST',
            body: data
        }
        )
        const file = await res.json();
        setImage(file.secure_url);
        setImage(false)

    }

    return(

    )

}

export ImageUpload;