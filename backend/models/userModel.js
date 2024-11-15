class User {
    static Roles = {
        ADMIN: 'admin',
        USER: 'user',
        SUPER_ADMIN: 'superAdmin',
    };

    constructor(id, name, email, password, role, createdAt) {
      this.id = id; // Firestore document ID
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role || User.Roles.USER;
      this.createdAt = createdAt || new Date(); // Set to current date if not provided
    }
    static async getNextId(db) {
      const counterDoc = db.collection('counters').doc('users');
      
      // Use transaction to ensure atomic update
      return db.runTransaction(async (transaction) => {
          const doc = await transaction.get(counterDoc);
          
          let nextId = 1;
          if (doc.exists) {
              nextId = doc.data().value + 1;
          }
          
          transaction.set(counterDoc, { value: nextId });
          return nextId;
      });
  }
  
    // Convert to Firestore data format (e.g., for setting document)
    toFirestore() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        createdAt: this.createdAt,
      };
    }
  
    // Static method for creating a User instance from Firestore document
    static fromFirestore(doc) {
      return new User(doc.id, doc.data().name, doc.data().email, doc.data().password, doc.data().createdAt);
    }
  
    // Add additional user-related methods if needed, like updating or validating
  }
  
  module.exports = User;  