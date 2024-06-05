from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from moviepy.editor import VideoFileClip
import subprocess

app = Flask(__name__)
CORS(app)



@app.route('/convert', methods=['POST'])
def convert_to_gif():
    text = request.json.get('text')
    if text:
        text = text.replace(' ', '_')
        text = '_' + text
        clip = VideoFileClip(rf"C:\Users\user 1\Downloads\LaVie-main\LaVie-main\res\base\{text}.mp4")
        gif_path = rf"C:\Users\user 1\Downloads\LaVie-main\LaVie-main\res\base\{text}.gif"
        clip.write_gif(gif_path)
        return send_file(gif_path, mimetype='image/gif'), 200
    else:
        return jsonify({'message': 'No text provided'}), 400

@app.route('/create', methods=['POST'])
def create_txt_file():
    text = request.json.get('text')
    if text:
        with open(r"C:\Users\user 1\Downloads\LaVie-main\LaVie-main\base\configs\sample.yaml", "w") as file:
            file.write("""# path:
ckpt_path: "../pretrained_models/lavie_base.pt"
output_folder: "../res/base/"
pretrained_path: "../pretrained_models"
# model config: 
model: UNet
video_length: 16
image_size: [320, 512]
# beta schedule
beta_start: 0.0001
beta_end: 0.02
beta_schedule: "linear"
# model speedup
use_compile: False
use_fp16: True
# sample config:
seed: #400
run_time: 0
guidance_scale: 7.5
sample_method: 'ddpm'
num_sampling_steps: 50
text_prompt: [ '
""")
            file.write(text)
            file.write("""'
]
""")
        return jsonify({'message': 'Text was sent successfully. Please run and execute'}), 200
    else:
        return jsonify({'message': 'No text provided'}), 400

@app.route('/execute', methods=['POST'])
@cross_origin()
def execute_bat_file():
    process = subprocess.Popen(["cmd", "/c", "C:/Users/user 1/Downloads/gifchat/run.bat"], stdout=subprocess.PIPE)
    output = process.communicate()[0]
    return jsonify({'message': 'GIF successfully made. Please download GIF'}), 200

if __name__ == '__main__':
    app.run(port=5000)