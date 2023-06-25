var isPlaying = false;
var webAudioContext = null;
var webAudioProcessor = null;
var unity_pd_piano = null;

window.onload = function(e)
{
  webAudioContext = new (window.AudioContext || window.webkitAudioContext);

  blockSize = 2048;

  unity_pd_piano = new unity_pd_pianoLib(
    {
      sampleRate: webAudioContext.sampleRate,
      blockSize: blockSize,
      printHook: hvPrintHook,
      sendHook: hvSendHook
    });

  webAudioProcessor = webAudioContext.createScriptProcessor(
    blockSize,
    unity_pd_piano.getNumInputChannels(),
    // Note: make sure there is at least one output channel specified so that
    // we can process patches that have no i/o objects (i.e. control only)
    Math.max(unity_pd_piano.getNumOutputChannels(), 1)
  );

  webAudioProcessor.onaudioprocess = function(e)
    {
      unity_pd_piano.process(e); 
    };

  document.getElementById("transportButton").textContent = "Enable Audio";
  
  isPlaying = false;

  // Generated Parameter Display Initialisations
  updateSlider_freq(500.0);
};

function hvPrintHook(message)
{
  console.log(message);
}

function hvSendHook(message)
{
  console.log(message);
}

function start()
{
  webAudioProcessor.connect(webAudioContext.destination);
  
  document.getElementById("transportButton").textContent = "Disable Audio";
  
  isPlaying = true;
}

function stop()
{
  webAudioProcessor.disconnect(webAudioContext.destination);
  
  document.getElementById("transportButton").textContent = "Enable Audio";
  
  isPlaying = false;
}

function toggleTransport(element)
{
  (isPlaying) ? stop() : start();
}

// Generated Event Update Methods
function sendEvent_bang()
{
  unity_pd_piano.sendEvent(0xFFFFFFFF); // "bang"
}

// Generated Parameter Update Methods
function updateSlider_freq(value)
{
  // document.getElementById("display_freq").textContent = Number(value).toFixed(2);
  
  unity_pd_piano.sendFloatToReceiver("freq", value);
}