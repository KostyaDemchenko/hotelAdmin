// schemas/roomType.ts
import {defineType, defineField} from 'sanity'

export const roomType = defineType({
  name: 'room',
  title: 'Номер',
  type: 'document',
  fields: [
    defineField({
      name: 'room_name',
      title: 'Название номера',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Название обязателено'),
    }),
    defineField({
      name: 'room_id',
      title: 'ID номера',
      type: 'string',
      description: 'Уникальный идентификатор (может совпадать с номером комнаты на стойке)',
      validation: (Rule) => Rule.required().min(1).error('ID обязателен'),
    }),
    defineField({
      name: 'room_description',
      title: 'Описание номера',
      type: 'text',
      validation: (Rule) =>
        Rule.required().min(10).error('Описание должно содержать минимум 10 символов'),
    }),
    defineField({
      name: 'room_additions',
      title: 'Дополнения',
      type: 'array',
      of: [
        defineField({
          name: 'addition',
          title: 'Дополнение',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Название дополнения',
              type: 'string',
              validation: (Rule) => Rule.required().error('Название обязательно'),
            },
            {
              name: 'icon',
              title: 'Класс иконки (RemixIcon, Lucide и т.д.)',
              type: 'string',
              validation: (Rule) => Rule.required().error('Иконка обязательна'),
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error('Нужно указать хотя бы одно дополнение'),
    }),
    defineField({
      name: 'room_photos',
      title: 'Фотографии номера',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.required().min(1).error('Загрузите минимум одну фотографию'),
    }),
    defineField({
      name: 'room_unavailable_ranges',
      title: 'Недоступные даты',
      description: 'Диапазоны дат, когда номер забронирован (формируется автоматически из заказов)',
      type: 'array',
      of: [
        defineField({
          name: 'range',
          title: 'Диапазон',
          type: 'object',
          fields: [
            {name: 'from', title: 'c', type: 'date', options: {dateFormat: 'YYYY-MM-DD'}},
            {name: 'to', title: 'по', type: 'date', options: {dateFormat: 'YYYY-MM-DD'}},
          ],
        }),
      ],
    }),
    defineField({
      name: 'room_size',
      title: 'Площадь (м²)',
      type: 'number',
      validation: (Rule) =>
        Rule.required().positive().error('Размер должен быть положительным числом'),
    }),
    defineField({
      name: 'room_beds',
      title: 'Количество кроватей',
      type: 'number',
      validation: (Rule) =>
        Rule.required().integer().positive().error('Укажите целое положительное число'),
    }),
    defineField({
      name: 'room_price',
      title: 'Цена за ночь (грн)',
      type: 'number',
      validation: (Rule) =>
        Rule.required().precision(2).positive().error('Цена должна быть положительной'),
    }),
    defineField({
      name: 'room_max_people',
      title: 'Максимум гостей',
      type: 'number',
      validation: (Rule) =>
        Rule.required().integer().positive().error('Укажите целое положительное число'),
    }),
    defineField({
      name: 'room_max_child',
      title: 'Максимум детей',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0).error('Укажите 0 или больше'),
    }),
  ],
})
