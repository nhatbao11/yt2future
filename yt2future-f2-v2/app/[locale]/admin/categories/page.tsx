'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { categoryApi } from '@/features/categories/api/categoryApi';
import { Trash2, Plus, Tag, Hash, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function AdminCategoriesPage() {
  const t = useTranslations('admin.categoriesPage');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await categoryApi.getCategories();
      if (res.success) setCategories(res.categories);
    } catch {
      toast.error(t('toast.loadError'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await categoryApi.createCategory({ name, slug });
      if (res.success) {
        toast.success(t('toast.createSuccess'));
        setName('');
        setSlug('');
        loadCategories();
      }
    } catch {
      toast.error(t('toast.createError'));
    }
  };

  const handleDelete = async (id: number, catName: string) => {
    if (window.confirm(t('confirmDelete', { catName }))) {
      try {
        await categoryApi.deleteCategory(id);
        toast.success(t('toast.deleteSuccess'));
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } catch {
        toast.error(t('toast.deleteError'));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Tag size={28} className="text-gray-600" /> {t('title')}
        </h2>
        <button
          onClick={loadCategories}
          className="p-3 border border-gray-300 hover:bg-gray-50 transition-all rounded-md"
        >
          <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORM THÊM */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5"
          >
            <h3 className="font-semibold text-gray-900 uppercase text-sm tracking-wide pb-3 border-b border-gray-200">
              {t('form.title')}
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                {t('form.name')}
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('form.namePlaceholder')}
                className="w-full border border-gray-300 rounded-md p-3 font-medium text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Slug (URL)
              </label>
              <input
                required
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder={t('form.slugPlaceholder')}
                className="w-full border border-gray-300 rounded-md p-3 font-medium text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 font-semibold uppercase text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-gray-800 transition-all rounded-md"
            >
              <Plus size={16} /> {t('form.submit')}
            </button>
          </form>
        </div>

        {/* DANH SÁCH */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-700">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">{t('table.category')}</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4 text-right">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-900">
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-500">#{cat.id}</td>
                    <td className="p-4 font-semibold uppercase">{cat.name}</td>
                    <td className="p-4 font-medium text-gray-600 flex items-center gap-1">
                      <Hash size={12} /> {cat.slug}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-2 border border-gray-300 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-all rounded-md"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
