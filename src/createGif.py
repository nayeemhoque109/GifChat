from PIL import Image, ImageTk
import subprocess
import tkinter as tk
import webbrowser
from moviepy.editor import VideoFileClip
from tkinter import *
import time
import os


# Main Window
root = tk.Tk()
root.title('GifChat')
root.geometry('1024x1024')

def open_webpage():
    webbrowser.open('https://gifchat.netlify.app/')

def convert_to_gif():
    text = text_entry.get("1.0", tk.END).strip()
    if text:
        text = text.replace(' ', '_')
        text = '_' + text
        clip = VideoFileClip(rf"C:\Users\user 1\Downloads\LaVie-main\LaVie-main\res\base\{text}.mp4")
        gif_path = rf"C:\Users\user 1\Downloads\LaVie-main\LaVie-main\res\base\{text}.gif"
        clip.write_gif(gif_path)


def create_txt_file():
    text = text_entry.get("1.0", tk.END).strip()
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

def execute_bat_file():
    process = subprocess.Popen(["cmd", "/c", "C:/Users/user 1/Downloads/gifchat/run.bat"], stdout=subprocess.PIPE)
    for line in iter(process.stdout.readline, b''):
        terminal.insert(tk.END, line)
    process.stdout.close()
    process.wait()

# Terminal Output
terminal = tk.Text(root, height=10, bg='black', fg='white')
terminal.pack(pady=10)

# Create a new frame
input_frame = tk.Frame(root)
input_frame.pack(pady=10)

# Prompt Label
prompt_label = tk.Label(input_frame, text="Prompt:")
prompt_label.grid(row=0, column=0)

# Text Entry
text_entry = tk.Text(input_frame, height=1, width=40)
text_entry.grid(row=0, column=1)

# Send Button
send_button = tk.Button(input_frame, text="Send", command=create_txt_file, bg='grey', fg='white')
send_button.grid(row=0, column=2)

# Create Button
create_button = tk.Button(root, text="Create", command=execute_bat_file, bg='grey', fg='white')
create_button.pack(pady=10)

# Image Display
image = tk.PhotoImage(file="C:/Users/user 1/Downloads/gifchat/public/logo.png")
image_label = tk.Label(root, image=image)
image_label.pack(pady=10)

# Open GifChat Messenger Button
button = tk.Button(root, text="Open GifChat Messenger", command=open_webpage, bg='grey', fg='white')
button.pack(pady=10)

root.mainloop()
