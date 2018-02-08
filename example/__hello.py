


def on_response(response):
    print(response)
    el = document.createElement('div')
    el.append('<p>' + response.data + '</p')
    document.body.appendChild(el)


def hello_world():
   print("Hello World")

   axios.js_get('https://enable-cors.org').then(on_response)


