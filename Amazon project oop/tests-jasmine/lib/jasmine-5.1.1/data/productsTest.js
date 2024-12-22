import { products, Product, Clothing, Appliance } from "../../../../data/products.js";

describe(' Testing product parent and child classes', ()=>{

  let product;
  let clothingProduct;
  let applianceProduct;

  beforeEach(()=>{
    product = new Product({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
          stars: 4.5,
          count: 56
      },
      priceCents: 799,
      sizeChartLink: "images/clothing-size-chart.png"
    });

    clothingProduct = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
          stars: 4.5,
          count: 56
      },
      priceCents: 799,
      sizeChartLink: "images/clothing-size-chart.png"
    });

    applianceProduct = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliances",
      warrantyLink:"images/appliance-instructions.png",
      instructionsLink:"images/appliance-warranty.png"
    });

    
  });

  
  
  it('Has the corret general properties',()=>{
    expect(product.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
  });

  it('Has the corret general clothing properties',()=>{
    expect(clothingProduct.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });

  it('Has the corret general appliance properties',()=>{
    expect(applianceProduct.warrantyLink).toEqual("images/appliance-instructions.png");
  });
  
  it("contains the right extraInfoHTML",()=>{
    expect(applianceProduct.extraInfoHTML()).toContain(`<a href="${applianceProduct.instructionsLink}" target="_blank"> Instructions </a>  
            <a href="${applianceProduct.warrantyLink}" target="_blank"> Warranty </a>
           `);
  });


  afterAll(()=>{
    console.log(product);
    console.log(clothingProduct);
    console.log(applianceProduct);
  })
});