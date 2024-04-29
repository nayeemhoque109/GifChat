@echo on
call C:\ProgramData\Anaconda3\Scripts\activate.bat
call cd C:\Users\user 1\Downloads\LaVie-main\LaVie-main
call conda activate lavie
call cd base
call python pipelines/sample.py --config configs/sample.yaml