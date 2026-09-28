document.getElementById("search").onclick=getInformation;
function validateInput()
{
    let obtenerMarca = document.getElementById('brand').value;
    let obtenerTipo = document.getElementById('product-type').value;
    if(obtenerMarca!=='' && obtenerTipo!=='')
    {
       return `${obtenerMarca} ${obtenerTipo}`;
    }else{
        alert('Add a brand and product type please');
    }
}

function getInformation(){
    let inputBrand=document.getElementById('brand').value;
    let inputProductType=document.getElementById('product-type').value;
    console.log(inputBrand)
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${inputBrand}&product_type=${inputProductType}&limit=5`)
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
            console.log(data)   
            showProducts(data)
               
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function showProducts(listProducts)
{
    let selectedProducts =null
    let html='';
    let card='';
        listProducts.forEach(product =>{
            console.log(product.name)
            card+=`<section class="product-card">
                    <img src="${product.image_link}" alt="product image">
                    <div><h5 class="description">${product.name}</h5></div>
                    <div><h5 class="title-description">Rating</h5><h5 class="description">${product.rating}</h5></div>
                    <div><h5 class="title-description">Category</h5><h5 class="description">${product.category} </h5></div>
                    <div><h5 class="title-description">Description</h5><h5 class="description">Maybelline Dream Matte Mouse Foundation is a revolutionary air-soft mousse that provides perfecting coverage for 100% velvet-matte complexion. It's non-comedogenic, fragrance-free, dermatologist-tested, allergy-tested and ideal for normal to oily skin.For best results: Apply smoothly and evenly to your face and blend with your fingertips.</h5></div>
                    <button type="button" name="button" class="select-product" data-brand="${product.brand}" data-name="${product.name}">Select product</button>
                    </section>`       
                })
        html+=`<section class="title">
                <h5 class="brand-title" id="selected-brand">${listProducts[0].brand.toUpperCase()}</h5>
                <h5 class="brand-title">${listProducts[0].product_type.toUpperCase()}</h5>
                <p>${listProducts.length}</p>
                </section>
                <section class="products">${card}</section>`
                        
    document.querySelector('.container-result-products').innerHTML=html;
}

document.querySelector(".container-result-products").addEventListener('click',(e)=>{
    const btnSelect = e.target.closest('.select-product');
    //const selectedProductName=document.getElementById(".selected-brand").value
    //console.log(`this is the selected brand${selectedProductName}`)
    if(!btnSelect){
        return alert("The product wasn't found")
    }else{
        getFDAInfo(btnSelect.dataset.brand)
    }
})

function getFDAInfo(productBrand)
{
    const targetUrl=`https://api.fda.gov/cosmetic/event.json?search=products:product_name="${productBrand}"&limit=10`
    fetch(targetUrl)
        .then((res) => res.json()) // parse response as JSON
         //object
        .then((data) => {
            console.log(data)
            data.results.forEach(report =>{
                 console.log(report.products[0].product_name)
                 console.log(report.event_date)
                 console.log(report.reactions)
            })
            showReports(data.results)
            
       })
    .catch(err => {
        console.log(`error ${err}`)
    });
}
//braking have to fix it
function showReports(listReportsFDA)
{
    let html='';
        listReportsFDA.forEach(report =>{
            console.log(report.products[0].product_name) 
            html+=`<section class="title">
                        <h5 class="brand-title">${report.products[0].product_name.toUpperCase()}</h5>
                    </section>
                    <section class="report-card">
                        <div><h5 class="title-description">Event Date</h5><h5 class="description">${report.event_date}</h5></div>
                        <div><h5 class="title-description">Reactions</h5><h5 class="description">${report.reactions} </h5></div>
                    <label>What would you like to discuss today?
					<input type="text" placeholder="Examples: I use this product daily and would like to know whether I should mention it before my facial." value=""  id="product-type">
				</label>
                </section>`
            })
        
                        
    document.querySelector('.container-result-FDA-information').innerHTML=html;
}








