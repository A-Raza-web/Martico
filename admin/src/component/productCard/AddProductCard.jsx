import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'

function AddProductCard({ onCancel, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <div className="card add-product-card">
      <div className="card-header">
        <div>
          <div className="card-title">Add Product</div>
          <div className="card-subtitle">Create a new product for your store.</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Product name"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Summer hoodie"
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="49.99"
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              select
              label="Category"
              fullWidth
              variant="outlined"
              size="small"
              defaultValue=""
            >
              <MenuItem value=""><em>Select category</em></MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="shoes">Shoes</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
            </TextField>

            <TextField
              label="In stock"
              type="number"
              fullWidth
              variant="outlined"
              size="small"
              placeholder="150"
            />
          </Stack>

          <TextField
            label="Image URL"
            fullWidth
            variant="outlined"
            size="small"
            placeholder="https://..."
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Short description shown on the product page."
          />

          <TextField
            select
            label="Status"
            fullWidth
            variant="outlined"
            size="small"
            defaultValue="draft"
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </TextField>

          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save product
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  )
}

export default AddProductCard
