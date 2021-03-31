var finput = BODY.add("input","type:file").e;
BODY.add("br");
var canvas = BODY.add("canvas").e;


[
0.0029150244650281948, 0.013064233284684923, 0.021539279301848634, 0.013064233284684923, 0.0029150244650281948,
0.013064233284684923, 0.05854983152431917, 0.09653235263005391, 0.05854983152431917, 0.013064233284684923,
0.021539279301848634, 0.09653235263005391, 0.15915494309189535, 0.09653235263005391, 0.021539279301848634,
0.013064233284684923, 0.05854983152431917, 0.09653235263005391, 0.05854983152431917, 0.013064233284684923,
0.0029150244650281948, 0.013064233284684923, 0.021539279301848634, 0.013064233284684923, 0.0029150244650281948
]

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
    var sum = 0;
    for(var i = 0; i < arr.length; i++){
        sum += arr[i];
    }
    for(var i = 0; i < arr.length; i++){
        arr[i] /= sum;
    }
    return arr;
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
    });while(){
        
    }
};

var generateKernel = function(n){
    var kernel = [1];
    for(var i = 0; i < n; i++){
        var kernel1 = genArray(n*n);
    }
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

finput.addEventListener("input",async function(){
    var file = this.files[0];
    if(!file)return false;
    var imgdata = await getImageDataFromFile(file);
    console.log(imgdata);
    
});