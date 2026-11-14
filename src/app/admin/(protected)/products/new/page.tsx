"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState("Cold-Filtered Native Whey Isolate");
  const [subtitle, setSubtitle] = useState("Single-Origin Madagascar Vanilla Bean");
  const [category, setCategory] = useState("Native Whey Isolates");
  const [description, setDescription] = useState(
    "Undenatured native whey peptide matrix extracted directly from raw pasture-fed milk via low-temperature cross-flow ceramic filtration. 28g pure protein per scoop."
  );
  const [ingredients, setIngredients] = useState(
    "Native Whey Isolate (Milk), Natural Flavors, Sunflower Lecithin (<0.5%), Stevia Leaf Extract."
  );
  const [size, setSize] = useState("1 kg");
  const [flavor, setFlavor] = useState("Madagascar Vanilla");
  const [servings, setServings] = useState(30);
  const [price, setPrice] = useState(3499);
  const [comparePrice, setComparePrice] = useState(3999);
  const [stock, setStock] = useState(84);
  const [batch, setBatch] = useState("NW-8902");
  const [hsn, setHsn] = useState("2106 90 99");
  const [fssai, setFssai] = useState("10020011003412");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
      }, 1000);
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <nav className="flex items-center gap-2 text-xs uppercase font-semibold text-outline mb-1">
            <Link href="/admin/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-primary">Add / Edit Product</span>
          </nav>
          <h1 className="font-headline-md text-headline-md font-semibold uppercase tracking-tight text-primary">
            Add / Edit Product
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            type="button"
            disabled={saving}
            className="px-6 py-2 bg-primary hover:bg-neutral-800 text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-secondary/15 border border-secondary/30 text-secondary flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Product saved successfully. Returning to catalog...</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Core Identity */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            01. Product Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Subtitle / Flavor Profile
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Discipline / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-xs uppercase font-semibold focus:outline-none focus:border-primary"
              >
                <option value="Native Whey Isolates">Native Whey Isolates</option>
                <option value="Cellular ATP & Creatine">Cellular ATP &amp; Creatine</option>
                <option value="Mineral Hydration & Electrolytes">Mineral Hydration &amp; Electrolytes</option>
                <option value="Recovery & Adaptogens">Recovery &amp; Adaptogens</option>
                <option value="Performance Hardware">Performance Hardware</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Batch Identifier
              </label>
              <input
                type="text"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
              Product Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Section 2: Variant Pricing & Inventory SKU */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            02. Pricing &amp; Stock
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Package Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="1 kg"
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Flavor
              </label>
              <input
                type="text"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Serving Count
              </label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Warehouse Stock Units
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm focus:outline-none focus:border-primary font-mono font-bold text-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Storefront Selling Price (₹ INR)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono font-bold text-primary focus:outline-none focus:border-primary text-base"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                Compare-at MRP Price (₹ INR)
              </label>
              <input
                type="number"
                value={comparePrice}
                onChange={(e) => setComparePrice(Number(e.target.value))}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono text-outline focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Ingredients & Regulatory Compliance */}
        <div className="bg-surface-container-lowest p-6 border border-outline-variant space-y-4 shadow-sm">
          <h2 className="font-title-md text-title-md uppercase font-bold text-primary border-b border-outline-variant/60 pb-2">
            03. Regulatory Compliance &amp; Purity Testing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                FSSAI Central License Number
              </label>
              <input
                type="text"
                value={fssai}
                onChange={(e) => setFssai(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
                HSN Code (Indian Customs / GST)
              </label>
              <input
                type="text"
                value={hsn}
                onChange={(e) => setHsn(e.target.value)}
                className="w-full h-11 px-3 bg-surface border border-outline-variant text-body-sm font-mono focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-on-surface-variant mb-1">
              Full Ingredients Protocol
            </label>
            <textarea
              rows={2}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-3 bg-surface border border-outline-variant text-body-sm font-body-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
