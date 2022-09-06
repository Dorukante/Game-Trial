from flask import Flask, render_template
# Bunu silme
app = Flask(__name__, template_folder="templates")

# Root for the main page


@app.route('/')
def Game():
    return render_template("Index.html")

#This is important
if __name__ == "__main__":
    app.run(debug=True)

    ## FYI you have to create static and templates folder