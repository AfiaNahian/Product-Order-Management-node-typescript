import { TProduct } from "./products.interface";
import { Products } from "./products.model";

// create a product
const createProductDB = async (productData : TProduct) => {
    const result = await Products.create(productData);
    return result;
}

// Get all products
const findProductDB = async () => {
    const result = await Products.find();
    return result;
}

// get a product with id
const findSingleProductDB = async (productId: string) => {
    const result = await Products.findOne({ _id: productId });
    return result;
}

// update a product
const updateProductDB = async (productId: string, updatedProduct: Partial<TProduct>) => {
    const result = await Products.findByIdAndUpdate(
        { _id: productId }, 
        { $set: updatedProduct }, 
        { new: true } 

    )
    return result;
}


//delete a product
const deleteProductDB = async (productId: string) => {
    const result = await Products.findByIdAndDelete({ _id: productId });
    return result;
}


// searching products with specified name or description 
const findProductWithSearch = async (query: string) => {
    const regexQuery = `${query}`;
    const result = await Products.find(
        {
            $or: [
                { name: { $regex: regexQuery, $options: 'i' } },
                { description: { $regex: regexQuery, $options: 'i' } },
                { category: { $regex: regexQuery, $options: 'i' } },
                { tags: { $regex: regexQuery, $options: 'i' } },
            ]
        }
    )
    return result;
}


export const ProductServices = {
    createProductDB,
    findProductDB,
    findSingleProductDB,
    updateProductDB,
    deleteProductDB,
    findProductWithSearch
}