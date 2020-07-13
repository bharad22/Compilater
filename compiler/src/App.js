import React from 'react';
import axios from 'axios';
//import fs from 'fs';
import $ from 'jquery';
//import select from 'react-select'
import log from './logo.png'
import './App.css';



class App extends React.Component {
  constructor(){
    super()
    this.state= {
      script : '',
      language: '', 
      clientId: 'e9c007457ca107f3ec84af57157e15fe',
      clientSecret:'3a8c94a8fb177282de0a418368612afd3d81286aed4807efa3b50a36f5c6dde4',
      output:'',
      statusCode :'',
      memory:'',
      cpuTime:'',
      stdin:'',
      x:false,
      loading:false
    }
   /* this.change=this.change.bind(this)
    this.change2=this.change2.bind(this)*/
    this.change3=this.change3.bind(this)
    this.read=this.read.bind(this)
    this.execute=this.execute.bind(this)
    this.dark=this.dark.bind(this)
  }




  /*change(event){
    this.setState({
      myTextArea: event.target.value
    })
    console.log(this.state.myTextArea)
  }
  change2(event){
    this.setState({
       input:event.target.value
    })
    console.log(this.state.input)
  }*/

change3(event){
  this.setState({
    language:event.target.value
    
  })
  console.log(this.state.language)
}
  componentDidMount(){
    $(".script").scroll(function(event){
      $(this).prev().height($(this).height());
      $(this).prev()[0].scrollTop = this.scrollTop;
    });
    $(".script").keyup(function(event){
      var elm = $(this);
      var lines = elm.val().split("\n");
      var numbers = "";
      for(var i=0; i<lines.length; i++)
          numbers += (i+1) + "\n";
      elm.prev().val(numbers);
      elm.prev()[0].scrollTop = this.scrollTop;
    });
    console.log(this.state)

    var textareas = document.getElementsByTagName('textarea');
    var count = textareas.length;
    for(var i=0;i<count;i++){
        textareas[i].onkeydown = function(e){
            if(e.keyCode===9 || e.which===9){
                e.preventDefault();
                var s = this.selectionStart;
                this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
                this.selectionEnd = s+1; 
            }
        }
    }
    

  }

  execute=()=>{
    this.setState({
      output:'',
      statusCode:'',
      memory:'',
      cpuTime:''
    })
    if(this.state.script !== ''){
      this.setState({loading:true})
      axios.post("http://localhost:9000/",this.state)
      .then(res=>this.setState({
        output:res.data.output,
        statusCode :res.data.statusCode,
        memory:res.data.memory,
        cpuTime:res.data.cpuTime,
        loading:false
      }))
      console.log(this.state.output)
  }
  else{
    alert("CODE NOT FOUND");
  }
  }


  uplload(event){
    event.preventDefault();
    document.getElementById('i2').addEventListener('click', upload);
    function upload(){
      document.getElementById('fileid').click();
      }
    } 

    read(event){
      event.preventDefault()
     // let x=event.target.files[0].name
      let files=event.target.files
      let reader=new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload=(event)=>{
        this.setState({script:event.target.result})
        console.log(this.state.script)
        
        let buff = Buffer.from(this.state.script, 'base64');  
        this.setState({script:buff.toString('utf-8').slice(14)});
        console.log(this.state.script);
        //this.setState({myTextArea:text})
        //console.log(this.state.myTextArea)
    }   
  }

  downloadTxtFile = () => {
    
    const f1=document.getElementById('script').value
    console.log(f1)
    if(f1!==''){
      const element = document.createElement("a");

      const file = new Blob([document.getElementById('script').value], {type: 'text/plain'});
      console.log(file)

      element.href = URL.createObjectURL(file);
      element.download = "File.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }

  }


dark=()=>{
  this.setState({
    x:!this.state.x
  })
  console.log(this.state.x)
  if(this.state.x === false){
    document.getElementById('h6').style.color='grey'

    document.getElementById("script").style.backgroundColor="#1a1a1a";
    document.getElementById("script").style.color="white";
    document.getElementById("script").style.borderColor="#333333";
    document.getElementById("script").style.boxShadow="3px 5px #333333";


    document.getElementById("line").style.backgroundColor="#1a1a1a";
    document.getElementById("line").style.color="white";
    document.getElementById("line").style.borderColor="#333333";
    document.getElementById("line").style.boxShadow=" 3px 5px #333333";
    
    document.getElementById("stdin").style.backgroundColor="#1a1a1a";
    document.getElementById("stdin").style.color="white";
    document.getElementById("stdin").style.borderColor="#333333";
    document.getElementById("stdin").style.boxShadow=" 3px 5px #333333";


    document.getElementById("up").style.backgroundColor="#1a1a1a";
    document.getElementById("up").style.borderColor="#333333";
    document.getElementById("up").style.boxShadow=" 3px 5px #333333";
    document.getElementById("i1").style.color="rgb(7, 161, 250)";
    document.getElementById("i2").style.color="rgb(7, 161, 250)";
    document.getElementById("i3").style.color="rgb(7, 161, 250)";
    document.getElementById("i4").style.color="rgb(7, 161, 250)";
    document.getElementById("i5").style.color="rgb(7, 161, 250)"; 
    
    document.getElementById("lang").style.backgroundColor="#292929";
    document.getElementById("lang").style.color="white";
    document.getElementById("lang").style.borderColor="grey";

    document.getElementById("output").style.backgroundColor="#1a1a1a";
    document.getElementById("output").style.boxShadow=" 3px 5px #333333";
    document.getElementById("output").style.borderColor="#333333";
    document.getElementById("p1").style.color="white";
    document.getElementById("p2").style.color="white";
    document.getElementById("p3").style.color="white";
    document.getElementById("p4").style.color="white";

    document.getElementById("main").style.backgroundColor="#121212";

  }
  else{
    document.getElementById('h6').style.color='black'

    document.getElementById("script").style.backgroundColor="#fffefc";
    document.getElementById("script").style.color="black";
    document.getElementById("script").style.borderColor="rgb(153, 152, 152)";
    document.getElementById("script").style.boxShadow="3px 5px rgb(153, 152, 152)";


    document.getElementById("line").style.backgroundColor="#fffefc";
    document.getElementById("line").style.color="black";
    document.getElementById("line").style.borderColor="rgb(153, 152, 152)";
    document.getElementById("line").style.boxShadow=" 3px 5px rgb(153, 152, 152)";
    
    document.getElementById("stdin").style.backgroundColor="#fffefc";
    document.getElementById("stdin").style.color="black";
    document.getElementById("stdin").style.borderColor="rgb(153, 152, 152)";
    document.getElementById("stdin").style.boxShadow=" 3px 5px rgb(153, 152, 152)";


    document.getElementById("up").style.backgroundColor="#fffefc";
    document.getElementById("up").style.borderColor="rgb(153, 152, 152)";
    document.getElementById("up").style.boxShadow=" 3px 5px rgb(153, 152, 152)";
    document.getElementById("i1").style.color="black";
    document.getElementById("i2").style.color="black";
    document.getElementById("i3").style.color="black";
    document.getElementById("i4").style.color="black";
    document.getElementById("i5").style.color="black"; 
    
    document.getElementById("lang").style.backgroundColor="#fffefc";
    document.getElementById("lang").style.color="black";
    document.getElementById("lang").style.borderColor="black";

    document.getElementById("output").style.backgroundColor="#fffefc";
    document.getElementById("output").style.boxShadow=" 3px 5px rgb(153, 152, 152)";
    document.getElementById("output").style.borderColor="rgb(153, 152, 152)";
    document.getElementById("p1").style.color="black";
    document.getElementById("p2").style.color="black";
    document.getElementById("p3").style.color="black";
    document.getElementById("p4").style.color="black";

    document.getElementById("main").style.backgroundColor="#dedede";
  }
}




  render()
  {
    const text = this.state.loading? "loading.....":''
    return (
      <div className="container-fluid main" id="main" >
        <center>
          <center>
            <div className="log">
              <img src={log} className="logo" alt="logo" />
              <h6  class="h6" id="h6">COMPI<span className="span">LATER</span></h6>
            </div>
          </center>
          <div className="flex-container" id="up">

            <i className="fas fa-cogs i5" id="i5" title="execute" onClick={this.execute}></i>

            <i className="fas fa-upload i2" id="i2" title="Upload-file" onClick={this.uplload}></i>
            <input id='fileid' type='file' onChange={this.read} hidden/>

            <i className="fas fa-download i1" title="Download-file" id="i1" onClick={this.downloadTxtFile}   ></i> 
            
            <i className="fas fa-lightbulb i3" title="Dark-mode" id="i3" onClick={this.dark}></i>
            
            <i className="fas fa-trash-alt i4" title="Clear-text" id="i4" onClick={()=>this.setState({script:'',stdin:'',output:'', loading:false,cpuTime:'', memory:'', statusCode:''})}></i>
            
            
            
           
            
            

            

            
            <select className="lang" id="lang" onChange={e => this.setState({ language: e.target.value})} value={this.state.language}>
              
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="c99">C99</option>
              <option value="cpp">C++</option>
              <option value="cpp14">C++14</option>
              <option value="cpp17">C++17</option>
              <option value="python2">Python2</option>
              <option value="python3">Python3</option>
              <option value="php">PHP</option>
              <option value="perl">Perl</option>
              <option value="r">R Language</option>
              <option value="dart">Dart</option>
              <option value="nodejs">Nodejs</option>
              <option value="ruby">Ruby</option>
              <option value="go">GoLang</option>
              <option value="scala">Scala</option>
              <option value="bash">Bash Shell</option>
              <option value="sql">SQL</option>
              <option value="pascal">Pascal</option>
              <option value="csharp">C#</option>
              <option value="vbn">VB.Net</option>
              <option value="haskell">Haskell</option>
              <option value="objc">ObjectiveC</option>
              <option value="swift">Swift</option>
              <option value="groovy">Groovy</option>


            </select>
            
            

            
          </div>
          </center>
          <center> 
        <div className="textarea">
          <textarea readOnly="readonly" className="line" id="line" />
          <textarea className="script" id="script" onChange={e => this.setState({ script: e.target.value })} value={this.state.script} autoComplete="on" placeholder="Enter The Code...." />
          <textarea className="stdin" id="stdin" onChange={e => this.setState({ stdin: e.target.value })} value={this.state.stdin} placeholder="Enter The Input...." />
        </div></center>
        <center>
        <div className="output" id="output">
          <p id="p1"> <b>Output :   {text}   </b>{this.state.output}</p>
          <p id="p2"> <b>Memory :       </b>{this.state.memory}</p>
          <p id="p3"> <b>CPU-TIME :      </b>{this.state.cpuTime}</p>
          <p id="p4"> <b>Status-Code :       </b> {this.state.statusCode}</p>
        </div>
        </center>
        
      </div>
      
  )
}
}

export default App;
