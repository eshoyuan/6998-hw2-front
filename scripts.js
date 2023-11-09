function searchPhotos() {
    let query = document.getElementById('searchQuery').value;
    sdk.searchGet({
        q: query
    }).then(response => {
        let resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        console.log(response)
    }).catch(error => {
        console.error('Error searching photos:', error);
    });
}

function uploadPhoto() {
    let fileInput = document.getElementById('photoUpload');
    let customLabels = document.getElementById('customLabels').value;
    let file = fileInput.files[0];
    
    if (!file) {
        console.error('Please select a file to upload.');
        return;
    }

    let reader = new FileReader();

    reader.onloadend = function () {
        let base64 = reader.result.replace(/^data:.+;base64,/, ''); // 去掉 Base64 编码前的文件信息
        let time = getCurrentDateTime();
        let body = JSON.stringify({
            base64: base64,
            customLabels: customLabels,
            uploadTime: time,
            filename: file.name,
        });
        console.log(body);
        sdk.imageuploadPut({},body,{})
        .then(function(result) {
            console.log('Image uploaded:', result);
        })
        .catch(function(error) {
            console.error('Upload failed:', error);
        });
    };

    reader.readAsDataURL(file); // 读取文件内容作为 Data URL
    document.getElementById('photoUpload').value = ""; // 重置文件输入
}



function getCurrentDateTime() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adding 1 because January is 0
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
  }
