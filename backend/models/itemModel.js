class Item {
    static Types = {
        SPAREPART: 'spare_part',
        MATERIAL:'material'
    }
    constructor(id, userID, nama_barang, kategori, description, createdAt) {
      this.id = id; // Firestore document ID
      this.userID = userID; // The ID of the user who added the item
      this.nama_barang = nama_barang;
      this.description = description;
      this.kategori = kategori || Item.Types
      this.createdAt = createdAt || new Date();
    }
  
    // Convert to Firestore data format
    toFirestore() {
      return {
        userId: this.userID,
        nama_barang: this.nama_barang,
        description: this.description,
        kategori: this.kategori,
        createdAt: this.createdAt,
      };
    }
  
    // Static method for creating an Item instance from Firestore document
    static fromFirestore(doc) {
      return new Item(doc.id, doc.data().userId, doc.data().nama_barang, doc.data().description, doc.data().createdAt);
    }
  
    // You can add additional methods like updating item, validating, etc.
  }
  
  module.exports = Item;
  