const compareChange = (arr,arr2) => {
    for(var i = 0 ; i < arr.length;i++){
        if(arr[i] != arr2[i]){
            return true;
        }
    }
    return false;
}

export default compareChange;