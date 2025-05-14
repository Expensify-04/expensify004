export const WithAuth=(Component:React.FC)=>{
    const isAuthenticated=false

    return()=>{
        if(isAuthenticated){
            return<Component/>
        }
       
    }
}