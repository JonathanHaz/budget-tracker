"use client";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDoc, QuerySnapshot, query, onSnapshot, DocumentData, deleteDoc, doc } from "firebase/firestore";
import { db } from '../lib/firebase'

interface Item {
  name: string;
  price: number | string;
  id: string;
  color: string; // Add color property to the Item interface
}

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', price: '', id: '', color: '#E3E3E3' }); // Initialize color here
  const [total, setTotal] = useState<number>(0);

  const addItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItem.name !== '' || newItem.price !== '') { 
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
        color: newItem.color 
      });
      setNewItem({ name: '', price: '', id: '', color: generateRandomColor() }); // Generate random color for new item
    }
  }

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => { 
      let itemArr: Item[] = [];

      // Get Items from Firebase
      querySnapshot.forEach((doc) => {
        itemArr.push({ ...(doc.data() as Item), id: doc.id }); 
      });
      setItems(itemArr);

      // Calculate Total Sum    
      const calculateTotal = () => {
        const totalPrice = itemArr.reduce((sum, item)=> sum + parseFloat(item.price.toString()), 0)
        setTotal(totalPrice)
      }
      calculateTotal()
      return () => unsubscribe();
    });

  }, []);

  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, 'items', id))
  }

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-600 p-4 rounded-lg">
          <form onSubmit={addItem} className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border rounded-3xl" type="text"
              placeholder="Enter Expense" />

            <input
              value={newItem.price.toString()} 
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="col-span-2 p-3 border mx-3 rounded-3xl" type="number" placeholder="Price in ₪" />
            <button className="text-white bg-slate-950 hover:bg-slate-900 p-2 text-xl rounded-full" type="submit">+</button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li className="my-4 w-full flex justify-between bg-slate-950 rounded-3xl hover:bg-slate-900" key={id}>
                <div className="p-4 w-full flex justify-between">
                  <div className="flex gap-3">
                    <div className="h-[20px] w-[20px] bg-blue-400 rounded-full" style={{ backgroundColor: item.color }} ></div>
                  <span className="capitalize">{item.name}</span>
                  </div>
                  <span>₪{item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 rounded-r-3xl border-l-2  border-slate-900 hover:bg-red-600 w-16">X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>₪{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
