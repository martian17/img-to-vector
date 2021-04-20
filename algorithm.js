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
    return arr;
};


//this one here is mutative function, so doesn't need to return
var applyKernel = function(data,width,height,kernel,k){//k is the kernel radius
    var n = k*2+1;
    var data0 = new Uint8ClampedArray(data.length);
    data0.set(data);
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            var kernelSum = 0;
            var sum = 0;
            for(var i = 0; i < n; i++){
                for(var j = 0; j < n; j++){
                    var x1 = (x+i-k);
                    var y1 = (y+j-k);
                    if(x1 < 0 || y1 < 0 || x1 >= width || y1 >= height){
                        continue;//kernel out of range
                    }
                    var idx1 = (y1*width+x1);
                    var kval = kernel[i*n+j];
                    kernelSum += kval;
                    sum += kval*data0[idx1];
                }
            }
            var idx = (y*width+x);
            data[idx] = sum/kernelSum;
        }
    }
};

var calculateGradientMagnitude = function(data,width,height){//applying the kernel and calculatig the magnitude
    var xkernel = [
        -1,0,1,
        -2,0,2,
        -1,0,1
    ];
    
    var ykernel = [
        -1,-2,-1,
        0,0,0,
        1,2,1
    ];
    var n = 3;
    var k = 1;
    var data0 = new Uint8ClampedArray(data.length);
    data0.set(data);
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            var xkernelSum = 0;
            var ykernelSum = 0;
            var xsum = 0;
            var ysum = 0;
            for(var i = 0; i < n; i++){
                for(var j = 0; j < n; j++){
                    var x1 = (x+i-k);
                    var y1 = (y+j-k);
                    if(x1 < 0 || y1 < 0 || x1 >= width || y1 >= height){
                        continue;//kernel out of range
                    }
                    var idx1 = (y1*width+x1);
                    var xkval = xkernel[i*n+j];
                    var ykval = ykernel[i*n+j];
                    xkernelSum += xkval;
                    ykernelSum += ykval;
                    xsum += xkval*data0[idx1];
                    ysum += ykval*data0[idx1];
                }
            }
            var idx = (y*width+x);
            var xmagn = xsum/(4*1.41421356);
            var ymagn = ysum/(4*1.41421356);
            if(x === 300 && y === 300){
                console.log(xmagn,ymagn,xkernelSum);
            }
            var magn = Math.sqrt(xmagn*xmagn+ymagn*ymagn);
            data[idx] = Math.floor(magn);
        }
    }
};

var gradientAndSuppression = function(data,width,height){//applying the kernel and calculatig the magnitude
    var xkernel = [
        -1,0,1,
        -2,0,2,
        -1,0,1
    ];
    
    var ykernel = [
        -1,-2,-1,
        0,0,0,
        1,2,1
    ];
    var n = 3;
    var k = 1;
    var data0 = new Uint8ClampedArray(data.length);
    data0.set(data);
    for(var y = 0; y < height; y++){
        for(var x = 0; x < width; x++){
            var xkernelSum = 0;
            var ykernelSum = 0;
            var xsum = 0;
            var ysum = 0;
            for(var i = 0; i < n; i++){
                for(var j = 0; j < n; j++){
                    var x1 = (x+i-k);
                    var y1 = (y+j-k);
                    if(x1 < 0 || y1 < 0 || x1 >= width || y1 >= height){
                        continue;//kernel out of range
                    }
                    var idx1 = (y1*width+x1);
                    var xkval = xkernel[i*n+j];
                    var ykval = ykernel[i*n+j];
                    xkernelSum += xkval;
                    ykernelSum += ykval;
                    xsum += xkval*data0[idx1];
                    ysum += ykval*data0[idx1];
                }
            }
            var idx = (y*width+x);
            var xmagn = xsum/(4*1.41421356);
            var ymagn = ysum/(4*1.41421356);
            if(x === 300 && y === 300){
                console.log(xmagn,ymagn,xkernelSum);
            }
            var magn = Math.sqrt(xmagn*xmagn+ymagn*ymagn);
            data[idx] = Math.floor(magn);
        }
    }
};


var applyKernelRGBA = function(imgdata,kernel,k){
    var data = imgdata.data;
    var width = imgdata.width;
    var height = imgdata.height;
    var n = k*2+1;
    var data0 = new Uint8ClampedArray(data.length);
    data0.set(data);
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

var toGrayscale = function(imgdata){
    var data0 = imgdata.data;
    var width = imgdata.width;
    var height = imgdata.height;
    var data = new Uint8ClampedArray(width*height);
    for(var i = 0; i < height; i++){
        for(var j = 0; j < width; j++){
            var sum = 0;
            var idx0 = (i*width+j)*4;
            var idx = (i*width+j);
            sum += data0[idx0+0];
            sum += data0[idx0+1];
            sum += data0[idx0+2];//averages out the rgb
            sum += data0[idx0+3];//averages out the rgb
            data[idx] = Math.floor(sum/4);
        }
    }
    return data;
};

