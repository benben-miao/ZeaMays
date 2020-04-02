<template>
  <div>
    <div class="header">
      <a href="#">
        <img src="https://pic.downk.cc/item/5e833ab3504f4bcb043cd472.png" class="logo" />
      </a>
      <span class="title">玉米生物图像识别 - (Zea-mays Bio Image Recognition)</span>
      <el-button class="process" @click="drawer = true" type="primary" size="small">特征过程</el-button>
      <el-button class="logout" type="primary" plain size="small" @click="logout">Logout</el-button>
    </div>
    <div class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="首页-(Home)" name="home" class="home">
          <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
              <h2>生物图像识别 - (Bio image recognition)</h2>
            </div>
            <div class="text item">
              <h4>
                1.基于OpenCV实现图像玉米颗粒图像识别和特征提取。
                <br />
                <br />(Image recognition and feature extraction of corn particles based on OpenCV.)
              </h4>
              <h4>
                2.图像基本特征包括：图像宽度像素、图像高度像素、图像格式类型、图像通道数等。
                <br />
                <br />(The basic characteristics of an image include: image width pixels, image height pixels, image format type, and number of image channels.)
              </h4>
              <h4>
                3.图像中玉米颗粒对象的特征提取：玉米颗粒位置识别、外部轮廓识别、最适轮廓周长、最适轮廓面积等。
                <br />
                <br />(Feature extraction of corn grain objects in the image: corn grain position recognition, external contour recognition, optimal contour perimeter, optimal contour area, etc.)
              </h4>
              <h4>
                4.图像提取过程：图像读取 -> 图像纠正 -> 图像矩阵化 -> 图像高斯模糊 -> 颜色二值化 -> 灰度提取
                <br />
                <br />-> 对象边界膨胀算法 -> 对象边界消蚀算法 -> 对象金字塔算法 -> 图像再次二值化 -> 对象等高线提取 -> 最优轮廓识别 -> 最优轮廓特征计算
                <br />
                <br />(Image extraction process: image reading-> image correction-> image matrixization-> image Gaussian blur-> color binarization-> grayscale extraction
                <br />
                <br />-> object boundary expansion algorithm-> object boundary erosion algorithm-> object pyramid algorithm -> Image binarization again-> Object contour extraction-> Optimal contour recognition-> Optimal contour feature calculation)
              </h4>
            </div>
            <el-button @click="drawer = true" type="primary" size="small">特征过程</el-button>
            <el-drawer title="特征过程：" :visible.sync="drawer" :direction="direction">
              <div class="drawer">
                <el-timeline>
                  <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                      <h4>1.图像读取</h4>const src = that.$cv.imread(imgElement)
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                      <h4>2.高斯模糊</h4>const imgBlur = new that.$cv.Mat()
                      <br />const ksize = new that.$cv.Size(7, 7)
                      <br />that.$cv.GaussianBlur(src, imgBlur, ksize, 0, 0)
                      <br />
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                      <h4>3.颜色二值化</h4>const imgBinary = new that.$cv.Mat()
                      <br />that.$cv.threshold(imgBlur, imgBinary, 60, 255, that.$cv.THRESH_BINARY)
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                      <h4>4.图像灰度转化</h4>const imgGray = new that.$cv.Mat()
                      <br />that.$cv.cvtColor(imgBinary, imgGray, that.$cv.COLOR_RGBA2GRAY, 0)
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                      <h4>5.对象膨胀算法</h4>const imgErode = new that.$cv.Mat()
                      <br />const kernel = that.$cv.Mat.ones(5, 5, that.$cv.CV_8U)
                      <br />const anchor = new that.$cv.Point(-1, -1)
                      <br />const iterations = 1
                      <br />that.$cv.erode(imgGray, imgErode, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                      <h4>6.对象消蚀算法</h4>const imgDilate = new that.$cv.Mat()
                      <br />that.$cv.dilate(imgErode, imgDilate, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                      <h4>7.对象等高线提取并计算</h4>const contours = new that.$cv.MatVector()
                      <br />const hierarchy = new that.$cv.Mat()
                      <br />that.$cv.findContours(imgBinary2, contours, hierarchy, that.$cv.RETR_TREE, that.$cv.CHAIN_APPROX_SIMPLE)
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-drawer>
          </el-card>
          <el-alert
            title="温馨提示-(Tips)："
            type="warning"
            :closable="false"
            description="用于玉米颗粒图像识别的图像不易过于复杂，推荐拍摄色彩简单且对比度明显的图像则结果更佳。(The image used for corn grain image recognition is not easy to be too complicated. It is recommended to take simple color and clear contrast images for better results.)"
            show-icon
          ></el-alert>
          <el-carousel :interval="5000" type="card" height="520px">
            <el-carousel-item>
              <img src="https://pic.downk.cc/item/5e833ab3504f4bcb043cd47c.png" class="carouselPics" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="https://pic.downk.cc/item/5e833ab3504f4bcb043cd480.png" class="carouselPics" />
            </el-carousel-item>
            <el-carousel-item>
              <img src="https://pic.downk.cc/item/5e833ab3504f4bcb043cd484.png" class="carouselPics" />
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="项目-(Project)" name="project" class="project">
          <el-alert
            title="运行方式:"
            :closable="false"
            type="success"
            description="左边为上传的原始图像，右边为OpenCV识别的图像对象，滑动栏可以选择最优的对象轮廓，对应地会重新计算数据并展示在页面下方。The left is the uploaded original image, and the right is the image object identified by OpenCV. The optimal object outline can be selected by sliding the bar, and the data will be recalculated and displayed at the bottom of the page accordingly."
          ></el-alert>
          <div class="control">
            <input type="file" id="fileInput" name="file" />
            <div class="slide">
              <span class="demonstration">选择最优轮廓</span>
              <el-slider v-model="contourNum" @change="slideNum"></el-slider>
            </div>
          </div>
          <div class="imageBox">
            <div class="inputoutput">
              <img id="imageSrc" src="../images/zea-mays.png" alt="No Image" />
              <div class="caption">imageSrc</div>
            </div>
            <div class="inputoutput">
              <canvas id="canvasOutput"></canvas>
              <div class="caption">canvasOutput</div>
            </div>
          </div>
          <div class="rate">
            <el-rate v-model="value2" :colors="colors"></el-rate>
          </div>
          <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
              <h2>图像信息 - (Image Informations)</h2>
            </div>
            <div class="imgInfo">1.玉米颗粒图像宽度-(Width)：{{ imgInfo.imgWidth }} px</div>
            <div class="imgInfo">2.玉米颗粒图像高度-(Height)：{{ imgInfo.imgHeight }} px</div>
            <div class="imgInfo">3.玉米颗粒图像深度-(Depth)：{{ imgInfo.imgDepth }}</div>
            <div class="imgInfo">4.玉米颗粒图像颜色通道-(Channels)：{{ imgInfo.imgChannels }}</div>
            <div class="imgInfo">5.玉米颗粒图像格式类型-(Type)：{{ imgInfo.imgType }}</div>
            <div class="imgInfo">6.玉米颗粒图像等高线数-(Contours)：{{ imgInfo.imgContours }}</div>
            <div class="imgInfo">7.玉米颗粒轮廓宽-(Cx)：{{ imgInfo.imgCx }} px</div>
            <div class="imgInfo">8.玉米颗粒轮廓高-(Cy)：{{ imgInfo.imgCy }} px</div>
            <div class="imgInfo">9.玉米颗粒轮廓面积-(Area)：{{ imgInfo.imgArea }} px*px</div>
            <div class="imgInfo">10.玉米颗粒轮廓周长-(perimeter)：{{ imgInfo.imgPerimeter }} px</div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="关于-(About)" name="about" class="about">
          <div class="block">
            <el-timeline>
              <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                  <h4>1.图像读取</h4>const src = that.$cv.imread(imgElement)
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                  <h4>2.高斯模糊</h4>const imgBlur = new that.$cv.Mat()
                  <br />const ksize = new that.$cv.Size(7, 7)
                  <br />that.$cv.GaussianBlur(src, imgBlur, ksize, 0, 0)
                  <br />
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>3.颜色二值化</h4>const imgBinary = new that.$cv.Mat()
                  <br />that.$cv.threshold(imgBlur, imgBinary, 60, 255, that.$cv.THRESH_BINARY)
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>4.图像灰度转化</h4>const imgGray = new that.$cv.Mat()
                  <br />that.$cv.cvtColor(imgBinary, imgGray, that.$cv.COLOR_RGBA2GRAY, 0)
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>5.对象膨胀算法</h4>const imgErode = new that.$cv.Mat()
                  <br />const kernel = that.$cv.Mat.ones(5, 5, that.$cv.CV_8U)
                  <br />const anchor = new that.$cv.Point(-1, -1)
                  <br />const iterations = 1
                  <br />that.$cv.erode(imgGray, imgErode, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>6.对象消蚀算法</h4>const imgDilate = new that.$cv.Mat()
                  <br />that.$cv.dilate(imgErode, imgDilate, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
                </el-card>
              </el-timeline-item>
              <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                  <h4>7.对象等高线提取并计算</h4>const contours = new that.$cv.MatVector()
                  <br />const hierarchy = new that.$cv.Mat()
                  <br />that.$cv.findContours(imgBinary2, contours, hierarchy, that.$cv.RETR_TREE, that.$cv.CHAIN_APPROX_SIMPLE)
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

// import '../plugins/imagedit.js'
// import '../plugins/opencv.js'

export default {
  data () {
    return {
      activeName: 'home',
      value1: null,
      value2: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      imgInfo: {
        imgWidth: null,
        imgHeight: null,
        imgDepth: null,
        imgChannels: null,
        imgType: null,
        imgContours: null,
        imgCx: null,
        imgCy: null,
        imgArea: null,
        imgPerimeter: null
      },
      drawer: false,
      direction: 'rtl',
      contourNum: 0
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('login')
    },
    slideNum () {
      this.process()
    }
  },
  mounted () {
    const imgElement = document.getElementById('imageSrc')
    const inputElement = document.getElementById('fileInput')
    inputElement.addEventListener('change', (e) => {
      imgElement.src = URL.createObjectURL(e.target.files[0])
    }, false)
    var that = this
    imgElement.onload = function () {
      that.process()
    }
    that.process = function () {
      const src = that.$cv.imread(imgElement)
      that.imgInfo.imgWidth = src.cols
      that.imgInfo.imgHeight = src.rows
      that.imgInfo.imgDepth = src.depth()
      that.imgInfo.imgChannels = src.channels()
      that.imgInfo.imgType = src.type()
      const imgBlur = new that.$cv.Mat()
      const ksize = new that.$cv.Size(7, 7)
      that.$cv.GaussianBlur(src, imgBlur, ksize, 0, 0)
      const imgBinary = new that.$cv.Mat()
      that.$cv.threshold(imgBlur, imgBinary, 60, 255, that.$cv.THRESH_BINARY)
      const imgGray = new that.$cv.Mat()
      that.$cv.cvtColor(imgBinary, imgGray, that.$cv.COLOR_RGBA2GRAY, 0)
      const imgErode = new that.$cv.Mat()
      const kernel = that.$cv.Mat.ones(5, 5, that.$cv.CV_8U)
      const anchor = new that.$cv.Point(-1, -1)
      const iterations = 1
      that.$cv.erode(imgGray, imgErode, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
      const imgDilate = new that.$cv.Mat()
      that.$cv.dilate(imgErode, imgDilate, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
      const imgMorphOpen = new that.$cv.Mat()
      that.$cv.morphologyEx(imgGray, imgMorphOpen, that.$cv.MORPH_OPEN, kernel, anchor, iterations, that.$cv.BORDER_CONSTANT, that.$cv.morphologyDefaultBorderValue())
      const imgBinary2 = new that.$cv.Mat()
      that.$cv.threshold(imgMorphOpen, imgBinary2, 254, 255, that.$cv.THRESH_BINARY)
      const contours = new that.$cv.MatVector()
      const hierarchy = new that.$cv.Mat()
      that.$cv.findContours(imgBinary2, contours, hierarchy, that.$cv.RETR_TREE, that.$cv.CHAIN_APPROX_SIMPLE)
      that.imgInfo.imgContours = contours.size()
      const color = new that.$cv.Scalar(0, 255, 0)
      const imgContour = that.$cv.Mat.zeros(src.rows, src.cols, that.$cv.CV_8UC3)
      that.$cv.drawContours(imgContour, contours, that.contourNum, color, 3, that.$cv.LINE_8, hierarchy, 100)
      const cnt = contours.get(that.contourNum)
      const moments = that.$cv.moments(cnt, false)
      // console.log('moments m00: ' + moments.m00)
      const cx = moments.m10 / moments.m00
      that.imgInfo.imgCx = cx
      const cy = moments.m01 / moments.m00
      that.imgInfo.imgCy = cy
      // console.log('cx: ' + cx)
      // console.log('cy: ' + cy)
      const area = that.$cv.contourArea(cnt, false)
      that.imgInfo.imgArea = area
      // console.log('area: ' + area)
      const perimeter = that.$cv.arcLength(cnt, true)
      that.imgInfo.imgArea = perimeter
      // console.log('perimeter: ' + perimeter)
      // console.log('contour channels: ' + cnt.channels())
      that.$cv.imshow('canvasOutput', imgContour)
      src.delete()
      imgBlur.delete()
      imgBinary.delete()
      imgGray.delete()
      imgErode.delete()
      imgDilate.delete()
      imgBinary2.delete()
      imgContour.delete()
      hierarchy.delete()
      contours.delete()
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 5;
  width: 99.5%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0px 2px 3px blue;
  padding: 5px;
}
.logo {
  width: 45px;
  border-radius: 3px;
  box-shadow: 0px 0px 3px #aaa;
}
.title {
  position: absolute;
  text-align: center;
  margin-left: 50%;
  top: 20px;
  transform: translate(-50%);
  font-size: 16px;
  text-shadow: 1px 1px 10px #888;
  font-weight: bolder;
}
.logout {
  position:absolute;
  top: 15px;
  right: 20px;
}
.process {
  position:absolute;
  top: 15px;
  right: 120px;
}
.content {
  top: 65px;
  position: absolute;
  padding: 20px;
  margin: 5px;
  margin-top: 10px;
  height: 1300px;
  width: 97.2%;
  box-shadow: 0px 0px 10px green;
}
.carouselPics {
  height: 520px;
  border-radius: 5px;
}
.el-carousel {
  margin-top: 20px;
  padding: 10px;
  border: 2px solid #eee;
  box-shadow: 0px 0px 3px green;
  border-radius: 5px;
}
.imageBox {
  margin-top: 10px;
  display: flex;
}
#imageSrc {
  height: 520px;
}
#canvasOutput {
  height: 520px;
}
.inputoutput {
  width: 50%;
  height: 520px;
  border: 10px solid #eee;
  border-radius: 3px;
  margin: 10px;
  box-shadow: 0px 0px 10px #eee;
  padding: 5px;
  overflow: hidden;
}
.rate {
  margin: 20px;
}
.imgInfo {
  width: 40%;
  height: 30px;
  box-shadow: 0px 0px 10px #eee;
  border-radius: 3px;
  padding: 10px;
  float: left;
  margin: 10px;
}
#fileInput {
  background-color: #fff;
  width: 50%;
  height: 40px;
  box-shadow: 0px 0px 10px #eee;
  padding: 10px;
  border-radius: 6px;
}
.drawer {
  overflow: auto;
}
.control {
  display: flex;
  padding: 10px;
}
.slide {
  width: 48%;
  height: 40px;
  margin-left: 20px;
  box-shadow: 0px 0px 10px #eee;
  padding: 10px 30px;
  border-radius: 6px;
}
.demonstration {
  font-size: 10px;
}
</style>
