<template>
    <div id="app">
        <div class="tool">
            <span>
                <a-upload name="file" :headers="headers" @change="handleChange">
                    <a-button>
                        <a-icon type="upload" /> Click to Upload
                    </a-button>
                </a-upload>
            </span>
            <a-button type="primary" class="new" icon="plus" @click="newDiagram"></a-button>
            <a-button type="primary" icon="download" @click="downloadBpmn"></a-button>
            <a-button type="primary" icon="picture" @click="downloadSvg"></a-button>
        </div>
        <div class="container">
            <!-- 创建一个canvas画布 npmn-js是通过canvas实现绘图的，并设置ref让vue获取到element -->
            <div class="bpmn-canvas" ref="canvas"></div>
            <div class="bpmn-js-properties-panel" id="js-properties-panel"></div>
        </div>
    </div>
</template>


  <script>
// 引入相关的依赖
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
// 在这里引入一下Bpmn建模器对象
import BpmnModeler from "bpmn-js/lib/Modeler";

// 左边工具栏以及编辑节点的样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

// 工具栏相关
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import propertiesPanelModule from "bpmn-js-properties-panel";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";


export default {
    data() {
        return {
            headers: {
                authorization: 'authorization-text',
            },
            bpmnModeler: null,
            canvas: null,
            // 这部分具体的代码我放到了下面
            initTemplate: `<?xml version="1.0" encoding="UTF-8"?>
<definitions 
  xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" 
  xmlns:camunda="http://camunda.org/schema/1.0/bpmn" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:activiti="http://activiti.org/bpmn" 
  id="m1577635100724" 
  name="" 
  targetNamespace="http://www.activiti.org/testm1577635100724"
>
  <process id="process" processType="None" isClosed="false" isExecutable="true">
    <extensionElements>
      <camunda:properties>
        <camunda:property name="a" value="1" />
      </camunda:properties>
    </extensionElements>
    <startEvent id="_2" name="start" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_leave">
    <bpmndi:BPMNPlane id="BPMNPlane_leave" bpmnElement="leave">
      <bpmndi:BPMNShape id="BPMNShape__2" bpmnElement="_2">
        <omgdc:Bounds x="144" y="368" width="32" height="32" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="149" y="400" width="23" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>`
        };
    },
    methods: {
       

        init() {
            // 获取画布 element
            this.canvas = this.$refs.canvas;

            // 创建Bpmn对象
            this.bpmnModeler = new BpmnModeler({
                // 设置bpmn的绘图容器为上门获取的画布 element
                container: this.canvas,

                // 加入工具栏支持
                propertiesPanel: {
                    parent: "#js-properties-panel"
                },
                additionalModules: [propertiesProviderModule, propertiesPanelModule],
                moddleExtensions: {
                    camunda: camundaModdleDescriptor
                }
            });

            this.createNewDiagram(this.initTemplate);
        },
        // initDiagram(bpmn) {
        //     // 将xml导入Bpmn-js建模器
        //     this.bpmnModeler.importXML(bpmn, err => {
        //         if (err) {
        //             this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
        //         }
        //     });
        // },
        async createNewDiagram(bpmn) {
            // 将字符串转换成图显示出来;
            this.bpmnModeler.importXML(bpmn, err => {
                if (err) {
                    this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
                }
            });
        },
         openBpmn(file) {
            const reader = new FileReader();
            // 读取File对象中的文本信息，编码格式为UTF-8
            reader.readAsText(file, "utf-8");
            reader.onload = () => {
                //读取完毕后将文本信息导入到Bpmn建模器
                this.createNewDiagram(reader.result);
            };
            return false;
        },
        newDiagram() {
            this.createNewDiagram(this.bpmnTemplate);
        },
        downloadBpmn() {
            this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
                if (!err) {
                    console.log(xml,'xml');
                    // 获取文件名
                    const name = `${this.getFilename(xml)}.bpmn`;
                    // 将文件名以及数据交给下载函数
                    this.download({ name: name, data: xml });
                }
            });
        },
        download({ name = "diagram.bpmn", data }) {
            const blob=new Blob([data])
            console.log('--------------',blob);
            // 这里就获取到了之前设置的隐藏链接
            const downloadLink = this.$refs.downloadLink;
            // 把数据转换为URI，下载要用到的
            const encodedData = encodeURIComponent(data,{type:'data:text/xml;charset=utf-8'});
            // if (data) {
            //     // 将数据给到链接
            //     downloadLink.href =
            //         "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
            //     // 设置文件名
            //     downloadLink.download = name;
            //     // 触发点击事件开始下载
            //     downloadLink.click();
            // }
        },

        getFilename(xml) {
            let start = xml.indexOf("process");
            let filename = xml.substr(start, xml.indexOf(">"));
            filename = filename.substr(filename.indexOf("id") + 4);
            filename = filename.substr(0, filename.indexOf('"'));
            return filename;
        },
        handleChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
    },
    // 生命周期钩子，在组件加载完成后调用init函数进行创建初始化Bpmn-js建模器
    mounted() {
        this.init();
    }
};
</script>
<style scoped>
.container {
    width: 100%;
    height: calc(100vh - 200px);
    display: flex;
}

.bpmn-canvas {
    height: 100%;
    width: 80vw;
}

.bpmn-js-properties-panel {
    flex: 1;
}
>>> .bjs-powered-by{
    display: none;
}
</style>