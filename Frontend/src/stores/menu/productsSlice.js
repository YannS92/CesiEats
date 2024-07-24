import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch("http://localhost:2000/menu");
    if (!response.ok) {
      throw new Error("Une erreur s'est produite lors de la récupération des produits.");
    }
    const data = await response.json();
    const products = data.map((menu) => {
      const { name, imageUrl, content, articles } = menu;
      return {
        name,
        imageUrl,
        content,
        articles,
      };
    });
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.status = "fulfilled";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectAllProducts = (state) => state.products;

export default productsSlice.reducer;
