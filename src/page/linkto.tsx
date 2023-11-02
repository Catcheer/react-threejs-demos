

function LinkTo(){
    const handleClickLink=()=>{
        console.log('handleClickLink=======================')
        console.log(window.bridge)
        console.log('1')
        window.bridge.goToMeijuPage('jumpweex',{
            url:'help-center/deviceSingle.js'
        })
        // window.bridge.getStatusBar((res:any)=>{
        //     console.log('res-------------',res.isDisplay)
        // },(fail:any)=>{
        //     console.log('failxxxxxxxx',fail)
        // })
    }
    return <div style={{marginTop:'50px'}}>
        <div onClick={handleClickLink}>tiaozhuan</div>
    </div>
}

export default LinkTo