export const handleDate = (created) =>{
    var d = new Date(created);
    
    return(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
}