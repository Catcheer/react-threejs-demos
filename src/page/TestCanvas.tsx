import { useLayoutEffect } from "react"


function TestCanvas(){

    useLayoutEffect(()=>{
        // const myimg = document.body.querySelector('.myimg') as HTMLImageElement
        const myCanvas = document.body.querySelector('#myCanvas') as HTMLCanvasElement;
        const myFile = document.body.querySelector('#myFile') as HTMLInputElement


        const ctx = myCanvas?.getContext('2d');

        const fileReader= new FileReader()
       

        myFile?.addEventListener('change',()=>{
            console.log(myFile.files&& myFile.files[0])
            let file : File | null
            file = myFile.files && myFile.files[0]

           
           if(file){
           
            file && fileReader.readAsDataURL(file)
            // return 

            const url = URL.createObjectURL(file)

            const img1 = new Image()
            img1.src = url
            img1.decode().then(res=>{
                ctx?.drawImage(img1,0,0,600,600/img1.width*img1.height)
                console.log('url--------------------',ctx?.getImageData(0,0,600,600/img1.width*img1.height))
                // ctx?.clearRect(0,0,600,600)
                // console.log('url--------------------',ctx?.getImageData(0,0,600,600/img1.width*img1.height))
                // file && fileReader.readAsDataURL(file)
            })
            
           }
           
         
        //     fileReader.onload=(e)=>{
        //             console.log(e.target?.result)
        //             if(e.target?.result){
        //             let str:any = e.target.result

        //             console.log(typeof str)
        //             //  console.log(typeof arrayBuf);
        //             //  var uint8Array:any = []
                  

        //     const img = new Image()
        //     img.src = str
        //    img.decode().then(()=>{
           
            
        //     ctx?.drawImage(img,0,0,600,600/img.width*img.height)
        //    const data =  ctx?.getImageData(0,0,600,600/img.width*img.height)
        //    console.log('base64----------',data)
        //    })



        //             // if(arrayBuf){
        //             //     uint8Array=  new Uint8Array(arrayBuf);
        //             //     console.log(uint8Array)
                        
        //             //     let arr = []

        //             //     for (let i=0;i<uint8Array.length;i++){
        //             //         arr.push(uint8Array[i])
        //             //         if((i+1)%3==0){
        //             //             arr.push(255)
        //             //         }
        //             //     }

        //             //     console.log(arr)
        //             //     // const uint8clampedarray = new Uint8ClampedArray(arr);
        //             //     // console.log(uint8clampedarray)

        //             //     // const imgData = new ImageData(uint8clampedarray,4)

        //             //     // ctx?.putImageData(imgData,0,0)
        //             // }
                   
        //         }
                    
        //     }
        })


//         const arr = new Uint8ClampedArray(40_000);
//         console.log(arr,arr.length)
//         console.log(arr.length)
//         for (let i = 0; i < arr.length; i += 4) {
//           arr[i + 0] = 0; // R value
//           arr[i + 1] = 190; // G value
//           arr[i + 2] = 250; // B value
//           arr[i + 3] = 255; // A value
//         }
//         console.log(arr)
// let imageData = new ImageData(arr, 500,20);
// console.log('imageData.data',imageData.data)
// console.log(imageData.height)


// const imageData = new ImageData(100,100);

// for(let i=0;i<imageData.data.length;i++){
//     if((i+1)%4===0){
//         imageData.data[i] = 255
//     }
// }

// console.log(imageData)

// ctx?.putImageData(imageData, 0, 0);

    },[])

    return <div>
         <canvas id="myCanvas" width={600} height={600}></canvas>
         <input type="file" id="myFile" />

         {/* <img className="myimg" src="" /> */}
    </div>
}

export default TestCanvas