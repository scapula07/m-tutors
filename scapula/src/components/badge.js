

const Badge=({children,cname})=>{

   return(
       <div className={`inline-block rounded-full p-1 border-3  text-center text-base ${cname}`}>
           {children}
       </div>
   )
}

export default Badge