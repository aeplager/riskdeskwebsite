﻿function checkParameters(accountname, sas) {
    var account = accountname;
    if (account == null || account.length < 1) {
        alert('Please enter a valid storage account name!');
        return false;
    }
    if (sas == null || sas.length < 1) {
        alert('Please enter a valid SAS Token!');
        return false;
    }
    return true;
}
function getBlobService(accountname, sas, blobUri) {
    if (!checkParameters(accountname, sas))
        return null;
    //blobUri = 'https://riskdeskstorage.blob.core.windows.net';
    var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, sas).withFilter(new AzureStorage.Blob.ExponentialRetryPolicyFilter());
    return blobService;
}
function refreshContainer() {
    var blobService = getBlobService();
    if (!blobService)
        return;
    document.getElementById('containers').innerHTML = 'Loading...';
    blobService.listContainersSegmented(null, function (error, results) {
        if (error) {
            alert('List container error, please open browser console to view detailed error');
            console.log(error);
        } else {
            var output = [];
            output.push('<tr>',
                '<th>ContainerName</th>',
                '<th>ContainerETag</th>',
                '<th>LastModified</th>',
                '<th>Operations</th>',
                '</tr>');
            if (results.entries.length < 1) {
                output.push('<tr><td>Empty results...</td></tr>');
            }
            for (var i = 0, container; container = results.entries[i]; i++) {
                output.push('<tr>',
                    '<td>', container.name, '</td>',
                    '<td>', container.etag, '</td>',
                    '<td>', container.lastModified, '</td>',
                    '<td>', '<button class="btn btn-xs btn-danger" onclick="deleteContainer(\'', container.name, '\')">Delete</button> ',
                    '<button class="btn btn-xs btn-success" onclick="viewContainer(\'', container.name, '\')">Select</button>', '</td>',
                    '</tr>');
            }
            document.getElementById('containers').innerHTML = '<table class="table table-condensed table-bordered">' + output.join('') + '</table>';
        }
    });
}
function deleteContainer(name) {
    var blobService = getBlobService();
    if (!blobService)
        return;
    blobService.deleteContainerIfExists(name, function (error, result) {
        if (error) {
            alert('Delete container failed, open brower console for more detailed info.');
            console.log(error);
        } else {
            alert('Delete ' + name + ' successfully!');
            refreshContainer();
        }
    });
}
function createContainer(ContainerName, accountname, sas, blobUri) {
    container = ContainerName;
    var blobService = getBlobService(accountname, sas, blobUri);
    if (!blobService)
        return;
    //var container = 'newcontainer';
    if (!AzureStorage.Blob.Validate.containerNameIsValid(container, function (err, res) { })) {
        alert('Invalid container name!');
        return;
    }
    blobService.createContainerIfNotExists(container, function (error, result) {
        if (error) {
            alert('Create container failed, open brower console for more detailed info.');
            console.log(error);
        } else {
            alert('Create ' + container + ' successfully!');
            refreshContainer();
        }
    });
}
function viewContainer(selectedContainer) {
    container = selectedContainer;
    document.getElementById('container').value = container;
    alert('Selected ' + container + ' !');
    refreshBlobList();
}
function refreshBlobList() {
    var blobService = getBlobService();
    if (!blobService)
        return;
    document.getElementById('result').innerHTML = 'Loading...';
    blobService.createContainerIfNotExists(container, function (error, result) {
        if (error) {
            alert('createContainerIfNotExists error, please open browser console to view detailed error');
            console.log(error);
        } else {
            blobService.listBlobsSegmented(container, null, function (error, results) {
                if (error) {
                    alert('List blob error, please open browser console to view detailed error');
                    console.log(error);
                } else {
                    var output = [];
                    output.push('<tr>',
                        '<th>BlobName</th>',
                        '<th>ContentLength</th>',
                        '<th>LastModified</th>',
                        '<th>Operations</th>',
                        '</tr>');
                    if (results.entries.length < 1) {
                        output.push('<tr><td>Empty results...</td></tr>');
                    }
                    for (var i = 0, blob; blob = results.entries[i]; i++) {
                        output.push('<tr>',
                            '<td>', blob.name, '</td>',
                            '<td>', blob.contentLength, '</td>',
                            '<td>', blob.lastModified, '</td>',
                            '<td>', '<button class="btn btn-xs btn-danger" onclick="deleteBlob(\'', blob.name, '\')">Delete</button> ',
                            '<a class="btn btn-xs btn-success" href="', blobUri + '/' + container + '/' + blob.name + sas, '" download>Download</a>', '</td>',
                            '</td>',
                            '</tr>');
                    }
                    document.getElementById('result').innerHTML = '<table class="table table-condensed table-bordered">' + output.join('') + '</table>';
                }
            });
        }
    })
}
function deleteBlob(blob) {
    var blobService = getBlobService();
    if (!blobService)
        return;
    blobService.deleteBlobIfExists(container, blob, function (error, result) {
        if (error) {
            alert('Delete blob failed, open brower console for more detailed info.');
            console.log(error);
        } else {
            alert('Delete ' + blob + ' successfully!');
            refreshBlobList();
        }
    });
}
function displayProcess(process) {
    document.getElementById("progress").style.width = process + '%';
    document.getElementById("progress").innerHTML = process + '%';
}
function uploadBlobByStream(checkMD5, files, container, accountname, sas, blobUri) {
    //var files = document.getElementById('files').files;
    if (!files.length) {
        alert('Please select a file!');
        return;
    }
    var file = files[0];
    //var blobService = getBlobService();
    var blobService = getBlobService(accountname, sas, blobUri);
    if (!blobService)
        return;
    //var btn = document.getElementById("upload-button");
    //btn.disabled = true;
    //btn.innerHTML = "Uploading";
    // Make a smaller block size when uploading small blobs
    var blockSize = file.size > 1024 * 1024 * 32 ? 1024 * 1024 * 4 : 1024 * 512;
    var options = {
        storeBlobContentMD5: checkMD5,
        blockSize: blockSize
    };
    blobService.singleBlobPutThresholdInBytes = blockSize;
    var finishedOrError = false;
    var container = 'testuploadcontainer';
    var speedSummary = blobService.createBlockBlobFromBrowserFile(container, file.name, file, options, function (error, result, response) {
        finishedOrError = true;
        //btn.disabled = false;
        //btn.innerHTML = "UploadBlob";
        if (error) {
            alert('Upload filed, open brower console for more detailed info.');
            var msg = "Upload Failed";
            alertify.error(msg);
            console.log(error);
            displayProcess(0);
        } else {
            displayProcess(100);
            setTimeout(function () { // Prevent alert from stopping UI progress update
                var msg = "Successful Upload";
                alertify.success(msg);
            }, 1000);
            //refreshBlobList();
        }
    });
    speedSummary.on('progress', function () {
        var process = speedSummary.getCompletePercent();
        displayProcess(process);
    });
}
function CreateContainerName() {
    try {
        var accountname = 'riskdeskstorage';
        var sas = '?sv=2017-11-09&ss=b&srt=sco&sp=rwdlac&se=2018-09-03T00:27:10Z&st=2018-09-02T16:27:10Z&spr=https,http&sig=G6VnxZVUlogyetZw2XLPF%2F9k2Kz0TyXEJ0GL46LVofQ%3D';
        blobUri = 'https://riskdeskstorage.blob.core.windows.net';
        container = document.getElementById('FieldForName').value;
        createContainer(container, accountname, sas, blobUri);
        alert('Complete');
    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}

function UploadFiles() {
    try {
        var files = document.getElementById('files').files;
        var accountname = 'riskdeskstorage';
        var sas = '?sv=2017-11-09&ss=b&srt=sco&sp=rwdlac&se=2018-09-03T00:27:10Z&st=2018-09-02T16:27:10Z&spr=https,http&sig=G6VnxZVUlogyetZw2XLPF%2F9k2Kz0TyXEJ0GL46LVofQ%3D';
        sas = '?sv=2017-11-09&ss=b&srt=sco&sp=rwdlac&se=2018-09-04T04:59:19Z&st=2018-09-03T02:03:19Z&spr=https,http&sig=Q6pQIXOShXVh46rbgE5IvThXmkZCkd9cZHGkWL%2BI4sA%3D';
        blobUri = 'https://riskdeskstorage.blob.core.windows.net';
        //container = document.getElementById('FieldForName').value;
        container = "testuploadcontainer";
        //createContainer(container, accountname, sas, blobUri);
        uploadBlobByStream(false, files, container, accountname, sas, blobUri);
        msg = "Uploading proceeding";
        alertify.success(msg);
        //alert("Finalized");

    }
    catch (e) {
        HeaderDataErrorReport(e);
    }
}
function HeaderDataErrorReport(e) {
    alert(e);
}