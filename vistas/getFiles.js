

async function getData() {

    const response = await fetch(productos);
    const data = await response.json();
    console.log(data);

    //Mostramos los datos recibidos y los imprimimos en el documento:

    for (item of data.productos) {

        const root = document.createElement('div');
        const card = document.createElement('div');
        const cardBody = document.createElement('div');
        const descripcion = document.createElement('h5');
        const imagen = document.createElement('img');

        card.className = 'card mb-3';
        cardBody.className = 'card-body';
        imagen.className = 'img-fluid';
        descripcion.className = 'mt-2';

        descripcion.textContent = item.descripcion;
        imagen.src = 'https://picsum.photos/200/300' + item.image;

        cardBody.append(imagen, descripcion);
        card.append(cardBody);
        root.append(card);
        document.getElementById('carritoContenido').append(root);

    }
}

getData();