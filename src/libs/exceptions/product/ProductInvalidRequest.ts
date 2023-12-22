export class ProductInvalidRequest extends Error {
  constructor(
    message = "Gagal Mendapatkan Produk"
  ) {
    super(message);
    this.name = "ProductInvalidRequest";
  }
}
