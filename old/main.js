var finput = BODY.add("input","type:file").e;
BODY.add("br");
var canvas = BODY.add("canvas").e;


//5x5 gaussian matrix
/*
[
0.0029150244650281948, 0.013064233284684923, 0.021539279301848634, 0.013064233284684923, 0.0029150244650281948,
0.013064233284684923, 0.05854983152431917, 0.09653235263005391, 0.05854983152431917, 0.013064233284684923,
0.021539279301848634, 0.09653235263005391, 0.15915494309189535, 0.09653235263005391, 0.021539279301848634,
0.013064233284684923, 0.05854983152431917, 0.09653235263005391, 0.05854983152431917, 0.013064233284684923,
0.0029150244650281948, 0.013064233284684923, 0.021539279301848634, 0.013064233284684923, 0.0029150244650281948
]
*/

var generateGaussianKernel = function(k){
    var n = k*2+1;
    var arr = [];
    var sigma2 = 1;
    for(var i  = 0; i < n; i++){
        for(var j  = 0; j < n; j++){
            //1/(σ√(2π))*e^(-1/2*((x-μ)/σ)^2)
            //0,1,2
            var ii = Math.abs(i-k);
            var jj = Math.abs(j-k);
            arr[i*n+j] = 1/(2*Math.PI*sigma2)*(Math.E**(((i-k)**2+(j-k)**2)/(-2*sigma2)));
        }
    }
    //this code no longer necessary because offset is calculated on the user side
    /*
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    for(var i = 0; i < arr.length; i++){
        arr[i] /= sum;
    }*/
    return arr;
};

var applyGaussianBlur = function(imgdata){
    var data = imgdata.data;
    var width = imgdata.width;
    var height = imgdata.height;
    var data0 = new Uint8ClampedArray(data.length);
    data0.set(data);
    var k = 2;
    var n = k*2+1;//true width of the kernel
    var kernel = generateGaussianKernel(k);
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            var kernelSum = 0;
            var rsum = 0;
            var gsum = 0;
            var bsum = 0;
            var asum = 0;
            for(var i = 0; i < n; i++){
                for(var j = 0; j < n; j++){
                    var x1 = (x+i-k);
                    var y1 = (y+j-k);
                    if(x1 < 0 || y1 < 0 || x1 >= width || y1 >= height){
                        continue;//kernel out of range
                    }
                    var idx1 = (y1*width+x1)*4;
                    var kval = kernel[i*n+j];
                    kernelSum += kval;
                    rsum += kval*data0[idx1+0];
                    gsum += kval*data0[idx1+1];
                    bsum += kval*data0[idx1+2];
                    asum += kval*data0[idx1+3];
                    
                }
            }
            var idx = (y*width+x)*4;
            data[idx+0] = rsum/kernelSum;
            data[idx+1] = gsum/kernelSum;
            data[idx+2] = bsum/kernelSum;
            data[idx+3] = asum/kernelSum;
        }
    }
};

var calcGradient = function(imgdata){
    var width = imgdata.width;
    var height = imgdata.height;
    for(var i = 0; i < width; i++){
        for(var j = 0; j < height; j++){
            
        }
    }
};


var getImageDataFromFile = function(file){
    return new Promise((resolve,reject)=>{
        var img = document.createElement("img");
        var reader  = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", ()=>{
            img.src = reader.result;
            img.addEventListener("load",function(){
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img,0,0);
                resolve(ctx.getImageData(0,0,img.width,img.height));
                //everything else, including the temp elements here and there, will be garbage collected
            });
        }, false);
    });
};


var blurImage = function(r){//say r=5
    var kernel = [];
}

var generateGradientField = function(){
    
}

var detectEdge = function(imgdata){
    var w = imgdata.width;
    var h = imgdata.height;
    for(var i = 0; i < h; i++){
        for(var j = 0; j < w; j++){
            var idx = i*w+j;
            //calculate the edge factor by using the kernel function
        }
    }
}


var pause = function(t){
    return new Promise((res,rej)=>{
        setTimeout(res,t);
    });
};

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);

finput.addEventListener("input",async function(){
    var file = this.files[0];
    if(!file)return false;
    var imgdata = await getImageDataFromFile(file);
    canvas.width = imgdata.width;
    canvas.height = imgdata.height;
    var ctx = canvas.getContext("2d");
    ctx.putImageData(imgdata,0,0);
    await pause(2000);
    applyGaussianBlur(imgdata);
    ctx.putImageData(imgdata,0,0);
    
    console.log(imgdata);
});