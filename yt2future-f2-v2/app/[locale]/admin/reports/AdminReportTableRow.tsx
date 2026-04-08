'use client';

import React from 'react';
import FallbackImage from '@/components/common/FallbackImage';
import { Check, Eye, Pencil, Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type AdminReportRow = {
  id: string;
  title: string;
  thumbnail?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  category?: { name?: string };
};

type Props = {
  report: AdminReportRow;
  onPreview: (report: AdminReportRow) => void;
  onReview: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  onEdit: (report: AdminReportRow) => void;
  onDelete: (id: string) => void;
};

/** Dùng createElement để không có text node giữa <tr> và <td> (React 19 / hydration). */
export function AdminReportTableRow({ report, onPreview, onReview, onEdit, onDelete }: Props) {
  const t = useTranslations('admin.reportsPage.row');
  const titleText = report.title.length > 60 ? `${report.title.slice(0, 60)}...` : report.title;
  const statusLabel =
    report.status === 'APPROVED'
      ? t('status.approved')
      : report.status === 'PENDING'
        ? t('status.pending')
        : t('status.rejected');

  return React.createElement(
    'tr',
    {
      className: 'border-b border-gray-100 hover:bg-gray-50 transition-all group',
    },
    React.createElement(
      'td',
      { className: 'p-4' },
      React.createElement(
        'div',
        { className: 'flex items-center gap-4' },
        React.createElement(
          'div',
          {
            className:
              'w-20 h-12 border border-gray-200 rounded-md shrink-0 relative overflow-hidden',
          },
          React.createElement(FallbackImage, {
            src: report.thumbnail || '/Logo.jpg',
            className: 'object-cover',
            alt: '',
            fill: true,
            sizes: '80px',
          }),
          React.createElement(
            'div',
            {
              className:
                'absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer',
              onClick: () => onPreview(report),
            },
            React.createElement(Eye, { size: 18, className: 'text-white' })
          )
        ),
        React.createElement(
          'p',
          {
            className: 'text-gray-900 font-medium leading-tight line-clamp-2 max-w-[350px]',
            title: report.title,
          },
          titleText
        )
      )
    ),
    React.createElement(
      'td',
      { className: 'p-4' },
      React.createElement(
        'span',
        {
          className:
            'px-3 py-1 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-600 font-medium whitespace-nowrap',
        },
        report.category?.name || '---'
      )
    ),
    React.createElement(
      'td',
      { className: 'p-4 text-center' },
      React.createElement(
        'div',
        {
          className: `inline-block px-3 py-1 text-xs font-semibold rounded-md ${
            report.status === 'APPROVED'
              ? 'bg-green-100 text-green-700'
              : report.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
          }`,
        },
        statusLabel
      )
    ),
    React.createElement(
      'td',
      { className: 'p-4 text-center space-x-1' },
      report.status === 'PENDING' &&
        React.createElement(React.Fragment, null, [
          React.createElement(
            'button',
            {
              key: 'ap',
              type: 'button',
              onClick: () => onReview(report.id, 'APPROVED'),
              className:
                'p-2 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-all rounded-md',
            },
            React.createElement(Check, { size: 16 })
          ),
          React.createElement(
            'button',
            {
              key: 'rj',
              type: 'button',
              onClick: () => onReview(report.id, 'REJECTED'),
              className:
                'p-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all rounded-md',
            },
            React.createElement(X, { size: 16 })
          ),
        ]),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => onEdit(report),
          className:
            'p-2 text-gray-400 hover:text-blue-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all rounded-md',
        },
        React.createElement(Pencil, { size: 16 })
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => onDelete(report.id),
          className:
            'p-2 text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all rounded-md',
        },
        React.createElement(Trash2, { size: 16 })
      )
    ),
    React.createElement('td', { className: 'w-auto' })
  );
}
