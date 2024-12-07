
// const User = require('../models/userModel');
// exports.registerProduct = async (req, res) => {
//     try {
//         const { email, category, description } = req.body;

//         console.log('Starting update for:', { email, category });

//         // First find the user
//         const user = await User.findOne({ email: email });
//         console.log('Found user:', user);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Verify the role is 'local'
//         if (user.role !== 'local') {
//             return res.status(403).json({
//                 message: 'Only local users can update the category.'
//             });
//         }

//         try {
//             // Update the user with validation
//             const updatedUser = await User.findOneAndUpdate(
//                 { email: email },
//                 {
//                     $set: {
//                         category: category,
//                         // description: description,
//                         role: 'local'  // ensure role is set
//                     }
//                 },
//                 {
//                     new: true,      // return updated document
//                     runValidators: true  // run schema validators
//                 }
//             );

//             console.log('Updated user:', updatedUser);

//             if (updatedUser) {
//                 res.status(200).json({
//                     message: 'Product category updated successfully!',
//                     category: updatedUser.category
//                 });
//             } else {
//                 res.status(500).json({
//                     message: 'Failed to update category'
//                 });
//             }
//         } catch (validationError) {
//             console.error('Validation Error:', validationError);
//             res.status(400).json({
//                 message: 'Invalid category data',
//                 error: validationError.message
//             });
//         }

//     } catch (error) {
//         console.error('Error in registerProduct:', error);
//         res.status(500).json({
//             message: 'Server error. Please try again later.',
//             error: error.message
//         });
//     }
// };


const User = require('../models/userModel');

exports.registerProduct = async (req, res) => {
    try {
        const { email, category, description, price, contact, name, password } = req.body;

        console.log('Starting update for:', { category, description, price, contact, name, password });

        // First, find the user
        console.log('User model:', User);
        const user = await User.findOne({ email: email });
        console.log('Found user:', user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify the role is 'local'
        if (user.role !== 'local') {
            return res.status(403).json({
                message: 'Only local users can register a product.',
            });
        }

        try {
            // Create a new product and associate it with the local user's email
            const newProduct = new User({ // Assuming `User` model represents a product model; adjust accordingly
                // email,
                password,
                category,
                description,
                name,
                price,
                contact,
                role: 'local', // This line is optional if the `role` is set properly when creating a product
            });

            // Save the new product
            await newProduct.save();
            console.log('Product successfully registered:', newProduct);

            res.status(201).json({
                message: 'Product registered successfully!',
                product: newProduct,
            });
        } catch (validationError) {
            console.error('Validation Error:', validationError);
            res.status(400).json({
                message: 'Invalid product data',
                error: validationError.message,
            });
        }
    } catch (error) {
        console.error('Error in registerProduct:', error);
        res.status(500).json({
            message: 'Server error. Please try again later.',
            error: error.message,
        });
    }
};
