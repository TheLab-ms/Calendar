import { CreateEventFormType } from '@/schemas/forms/createEventForm';
import { Field, FormikErrors, FormikTouched } from 'formik';

interface ConfiguredFieldProps {
    name: string;
    touch?: boolean;
    error?: string;
    component?: string;
    type?: string;
    options?: {
        value: string | number;
        label: string;
    }[];
    min?: number;
    max?: number;
    rows?: number;
}

export const ConfiguredField = ({ name, touch, error, component, type, options, rows }: ConfiguredFieldProps) => {
    const fieldProps = {
        name,
        className: `w-full px-4 py-2 border rounded ${touch && error
            ? 'border-red-500'
            : 'border-gray-300'
            }`,
    }
    // Add an empty option to the select field if provided without causing a hyrdation error
    return (
        <>
            {
                options ? (
                    <Field
                        component="select"
                        {...fieldProps}
                    >
                        {component === 'select' && options && (
                            options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        )}
                    </Field >
                ) : (
                    <Field
                        type={type ? type : null}
                        component={component ? component : null}
                        rows={component === 'textarea' ? rows : null}
                        {...fieldProps}
                    />
                )}
        </>
    )
}


// type GenericFieldProps = ConfiguredFieldProps & {
//     title: string;
// };
// GenericFieldProps is a type that extends ConfiguredFieldProps with a title property but it also removes touch and error properties from ConfiguredFieldProps. Instead having touched and errors properties in GenericFieldProps, we will have them in FormikTouched and FormikErrors types. We will use these types to get the correct type for the touched and errors properties in GenericFieldProps.

type GenericFieldProps = ConfiguredFieldProps & {
    title: string;
    touched: FormikTouched<CreateEventFormType>;
    errors: FormikErrors<CreateEventFormType>;
}

export const GenericField = ({ name, title, type, component, touched, errors, options, rows }: GenericFieldProps) => {
    const error = errors[name as keyof CreateEventFormType];
    const touch = touched[name as keyof CreateEventFormType] || false;

    return (
        <>
            <label htmlFor={name} className="block text-sm font-semibold mb-2 mt-2">
                {title}
            </label>
            <ConfiguredField name={name} touch={touch} error={error} component={component} type={type} options={options} rows={rows} />
            {touch && error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </>
    )
};


interface DoubleFieldProps {
    title: string;
    touched: FormikTouched<CreateEventFormType>;
    errors: FormikErrors<CreateEventFormType>;
    fields: Omit<ConfiguredFieldProps, 'touch'>[];
}

export const DoubleField = ({ title, fields, errors, touched }: DoubleFieldProps) => (
    <>
        <label className="block text-sm font-semibold mb-2 mt-2">
            {title}
        </label>
        <div className="flex">
            {fields.map((field, index) => {
                const error = errors[field.name as keyof CreateEventFormType];
                const touch = touched[field.name as keyof CreateEventFormType] || false;
                const { component, type, options } = field;
                return (
                    <ConfiguredField key={index} name={field.name} touch={touch} error={error} component={component} type={type} options={options} />
                )
            })}
        </div>
    </>
)
