import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { GameSettings } from '../../types';
import Button from '../Button/Button';
import Card from '../Card/Card';
import styles from './SettingsForm.module.css';

interface SettingsFormProps {
  initialSettings: GameSettings;
  onSubmit: (settings: GameSettings) => void;
  onCancel?: () => void;
}

const validationSchema = Yup.object({
  difficulty: Yup.string().oneOf(['easy', 'medium', 'hard', 'all']).required('Оберіть складність'),
  count: Yup.number()
    .min(1, 'Мінімум 1 питання')
    .max(15, 'Максимум 15 питань')
    .required('Вкажіть кількість питань'),
  timerDuration: Yup.number()
    .min(5, 'Мінімум 5 секунд')
    .max(60, 'Максимум 60 секунд')
    .required('Вкажіть час на відповідь')
});

const SettingsForm: React.FC<SettingsFormProps> = ({ 
  initialSettings, 
  onSubmit, 
  onCancel 
}) => {
  return (
    <Card>
      <h3>Налаштування гри</h3>
      
      <Formik
        initialValues={initialSettings}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="difficulty">Складність:</label>
              <Field as="select" id="difficulty" name="difficulty">
                <option value="all">Всі</option>
                <option value="easy">Легка</option>
                <option value="medium">Середня</option>
                <option value="hard">Складна</option>
              </Field>
              <ErrorMessage name="difficulty" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="count">Кількість питань:</label>
              <Field 
                type="number" 
                id="count" 
                name="count" 
                min="1" 
                max="20" 
              />
              <ErrorMessage name="count" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="timerDuration">
                Час на відповідь (секунди): {values.timerDuration}s
              </label>
              <Field 
                type="range" 
                id="timerDuration" 
                name="timerDuration" 
                min="5" 
                max="60" 
                step="5"
              />
              <ErrorMessage name="timerDuration" component="div" className={styles.error} />
            </div>

            <div className={styles.actions}>
              {onCancel && (
                <Button type="button" variant="secondary" onClick={onCancel}>
                  Скасувати
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                Зберегти налаштування
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SettingsForm;