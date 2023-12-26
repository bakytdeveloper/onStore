// client/src/components/AdminPanel/ProductForm.js
import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        direction: '',
        type: '',
        brand: '',
        images: [],
        name: '',
        description: '',
        price: 0,
        characteristics: [{ name: '', value: '' }],
    });

    const handleChange = (index) => (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };
        if (name === 'characteristicName' || name === 'characteristicValue') {
            newFormData.characteristics[index][name === 'characteristicName' ? 'name' : 'value'] = value;
        } else if (name === 'images') {
            // Обрабатываем ввод изображений как массива
            newFormData[name] = value.split(',').map((url) => url.trim());
        } else {
            newFormData[name] = value;
        }
        setFormData(newFormData);
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

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Direction:
                <input
                    type="text"
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Type:
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Brand:
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Images (comma-separated URLs):
                <input
                    type="text"
                    name="images"
                    value={formData.images.join(',')}
                    onChange={(e) => handleChange()(e)}
                />
            </label>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange()}
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange()}
                />
            </label>
            <div>
                <p>Characteristics:</p>
                {formData.characteristics.map((char, index) => (
                    <div key={index}>
                        <label>
                            Characteristic Name:
                            <input
                                type="text"
                                name="characteristicName"
                                value={char.name}
                                onChange={handleChange(index)}
                            />
                        </label>
                        <label>
                            Characteristic Value:
                            <input
                                type="text"
                                name="characteristicValue"
                                value={char.value}
                                onChange={handleChange(index)}
                            />
                        </label>
                        <button type="button" onClick={() => handleRemoveCharacteristic(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddCharacteristic}>
                    Add Characteristic
                </button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
