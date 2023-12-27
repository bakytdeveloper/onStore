// // client/src/components/AdminPanel/ProductForm.js
// import React, { useState } from 'react';
//
// const ProductForm = ({ onSubmit, initialData }) => {
//     const [formData, setFormData] = useState(initialData || {
//         direction: '',
//         type: '',
//         brand: '',
//         images: [],
//         name: '',
//         description: '',
//         price: 0,
//         characteristics: [{ name: '', value: '' }],
//     });
//
//     const handleChange = (index) => (e) => {
//         const { name, value } = e.target;
//         const newFormData = { ...formData };
//         if (name === 'characteristicName' || name === 'characteristicValue') {
//             newFormData.characteristics[index][name === 'characteristicName' ? 'name' : 'value'] = value;
//         } else if (name === 'images') {
//             // Обрабатываем ввод изображений как массива
//             newFormData[name] = value.split(',').map((url) => url.trim());
//         } else {
//             newFormData[name] = value;
//         }
//         setFormData(newFormData);
//     };
//
//     const handleFileChange = (e) => {
//         const files = e.target.files;
//         const urls = Array.from(files).map(file => URL.createObjectURL(file));
//         setFormData((prevData) => ({
//             ...prevData,
//             images: [...prevData.images, ...urls],
//         }));
//     };
//
//     const handleAddCharacteristic = () => {
//         setFormData((prevData) => ({
//             ...prevData,
//             characteristics: [...prevData.characteristics, { name: '', value: '' }],
//         }));
//     };
//
//     const handleRemoveCharacteristic = (index) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             characteristics: prevData.characteristics.filter((_, i) => i !== index),
//         }));
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };
//
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Direction:
//                 <input
//                     type="text"
//                     name="direction"
//                     value={formData.direction}
//                     onChange={handleChange()}
//                 />
//             </label>
//             <label>
//                 Type:
//                 <input
//                     type="text"
//                     name="type"
//                     value={formData.type}
//                     onChange={handleChange()}
//                 />
//             </label>
//             <label>
//                 Brand:
//                 <input
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleChange()}
//                 />
//             </label>
//             <label>
//                 Images (comma-separated URLs or upload images):
//                 <input
//                     type="file"
//                     name="images"
//                     accept="image/*"
//                     multiple
//                     onChange={handleFileChange}
//                 />
//             </label>
//             <label>
//                 Name:
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange()}
//                 />
//             </label>
//             <label>
//                 Description:
//                 <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange()}
//                 />
//             </label>
//             <label>
//                 Price:
//                 <input
//                     type="number"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange()}
//                 />
//             </label>
//             <div>
//                 <p>Characteristics:</p>
//                 {formData.characteristics.map((char, index) => (
//                     <div key={index}>
//                         <label>
//                             Characteristic Name:
//                             <input
//                                 type="text"
//                                 name="characteristicName"
//                                 value={char.name}
//                                 onChange={handleChange(index)}
//                             />
//                         </label>
//                         <label>
//                             Characteristic Value:
//                             <input
//                                 type="text"
//                                 name="characteristicValue"
//                                 value={char.value}
//                                 onChange={handleChange(index)}
//                             />
//                         </label>
//                         <button type="button" onClick={() => handleRemoveCharacteristic(index)}>
//                             Remove
//                         </button>
//                     </div>
//                 ))}
//                 <button type="button" onClick={handleAddCharacteristic}>
//                     Add Characteristic
//                 </button>
//             </div>
//             <button type="submit">Submit</button>
//         </form>
//     );
// };
//
// export default ProductForm;


/// client/src/components/AdminPanel/ProductForm.js
import React, { useState } from 'react';
import './ProductForm.css'

const ProductForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        direction: '',
        type: '',
        brand: '',
        // images: [],
        name: '',
        description: '',
        price: "",
        images: [],
        characteristics: [{ name: '', value: '' }],
    });
    const [previewVisible, setPreviewVisible] = useState(false);

    const handleChange = (index) => (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };
        if (name === 'characteristicName' || name === 'characteristicValue') {
            newFormData.characteristics[index][name === 'characteristicName' ? 'name' : 'value'] = value;
        } else if (name === 'images') {
            newFormData[name] = value.split(',').map((url) => url.trim());
            setPreviewVisible(true);
        } else {
            newFormData[name] = value;
        }
        setFormData(newFormData);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
        setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...urls],
        }));
        setPreviewVisible(true);
    };

    const handleAddCharacteristic = () => {
        setFormData((prevData) => ({
            ...prevData,
            characteristics: [...prevData.characteristics, { name: '', value: '' }],
        }));
    };

    const handleRemoveCharacteristic = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            characteristics: prevData.characteristics.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Направление:
                <input
                    type="text"
                    name="direction"
                    placeholder="Направление"
                    value={formData.direction}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Тип:
                <input
                    type="text"
                    name="type"
                    placeholder="Тип"
                    value={formData.type}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Бренд:
                <input
                    type="text"
                    name="brand"
                    placeholder="Бренд"
                    value={formData.brand}
                    onChange={handleChange()}
                />
            </label>
            {/*<label>*/}
            {/*    Images (comma-separated URLs or upload images):*/}
            {/*    <input*/}
            {/*        type="file"*/}
            {/*        name="images"*/}
            {/*        accept="image/*"*/}
            {/*        multiple*/}
            {/*        onChange={handleFileChange}*/}
            {/*    />*/}
            {/*</label>*/}
            {/*{previewVisible && (*/}
            {/*    <div>*/}
            {/*        <p>Image Previews:</p>*/}
            {/*        <div className="image-previews">*/}
            {/*            {formData.images.map((url, index) => (*/}
            {/*                <div key={index} className="image-preview">*/}
            {/*                    <img src={url} alt={`Preview ${index + 1}`} />*/}
            {/*                    <button type="button" onClick={() => handleRemoveImage(index)}>*/}
            {/*                        Remove*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
            <label>
                Наименование:
                <input
                    type="text"
                    name="name"
                    placeholder="Наименование"
                    value={formData.name}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Описание:
                <textarea
                    name="description"
                    placeholder="Описание"
                    value={formData.description}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Цена:
                <input
                    type="number"
                    name="price"
                    placeholder="0"
                    value={formData.price}
                    onChange={handleChange()}
                />
            </label>


            <label>
                Images (comma-separated URLs or upload images):
                <input
                    type="file"
                    name="images"
                    placeholder="Картинки"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
            </label>
            {previewVisible && (
                <div>
                    <p>Предварительный просмотр изображений:</p>
                    <div className="image-previews">
                        {formData.images.map((url, index) => (
                            <div key={index} className="image-preview">
                                <img src={url} alt={`Preview ${index + 1}`} />
                                <button type="button" onClick={() => handleRemoveImage(index)}>
                                    Удалять
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            <div>
                <p>Характеристики:</p>
                {formData.characteristics.map((char, index) => (
                    <div key={index}>
                        <label>
                            Наименование Характеристики:
                            <input
                                type="text"
                                name="characteristicName"
                                value={char.name}
                                onChange={handleChange(index)}
                            />
                        </label>
                        <label>
                            Значение Характеристики:
                            <input
                                type="text"
                                name="characteristicValue"
                                value={char.value}
                                onChange={handleChange(index)}
                            />
                        </label>
                        <button type="button" onClick={() => handleRemoveCharacteristic(index)}>
                            Удалять
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddCharacteristic}>
                    Добавить характеристику
                </button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
