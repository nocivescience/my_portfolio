set -o errexit
#poetry install
pip install -r requirements.txt
python manage.py collestatic --no-input
python manage.py migrate