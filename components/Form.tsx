import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Loader from './Loader';
import { trpc } from '../utils/trpc';
import { schema } from '../shared/form.schema';

type Inputs = {
  longUrl: string;
  optionalEnding: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: { longUrl: '', optionalEnding: '' },
    resolver: zodResolver(schema),
  });

  const createTinyLink = trpc.useMutation('create-tiny-link');
  const checkIfEndingTaken = trpc.useMutation('check-if-taken');

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [available, setAvailable] = useState(true);

  const checkIfAvailable = async () => {
    const value = getValues('optionalEnding');
    setChecked(true);
    if (value.length < 3 && value.length !== 0) {
      setError('optionalEnding', {
        type: 'manual',
        message: 'Minimum 3 characters or empty',
      });
    } else if (value.length === 0) {
      clearErrors('optionalEnding');
    } else {
      console.log(value);
      setLoading(true);
      const response = await checkIfEndingTaken.mutateAsync({
        optionalEnding: value,
      });
      clearErrors('optionalEnding');
      if (response.ok) {
        setAvailable(true);
        setLoading(false);
      } else if (!response.ok) {
        setAvailable(false);
        setLoading(false);
        setError('optionalEnding', {
          type: 'custom',
          message: 'Ending already taken',
        });
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!checked && data.optionalEnding !== '') {
      setError('optionalEnding', {
        type: 'custom',
        message: 'Please check if ending is available',
      });
    } else {
      const response = await createTinyLink.mutateAsync(data);
      console.log(response);
      setChecked(false);
      reset();
    }
    console.log('data', data);
  };

  return (
    <div className="mt-16 md:mt-8 md:w-3/5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-200 text-md mb-2" htmlFor="longUrl">
            Your long url
          </label>
          <input
            className={`shadow rounded-lg w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.longUrl && 'border-[1px] border-red-500'
            }`}
            type="text"
            id="longUrl"
            placeholder="www.very-long-url.com/you-want-to-shorten"
            {...register('longUrl', { required: true })}
          />
          {errors.longUrl && (
            <span className="text-red-500 text-sm">
              {errors.longUrl.message}
            </span>
          )}
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-200 text-md mb-2"
            htmlFor="customEnding"
          >
            Optional: Your own custom ending [3 to 20 characters]
          </label>
          <div
            className={`w-full flex ${
              errors.optionalEnding && 'border-[1px] border-red-500 rounded-lg'
            }`}
          >
            <input
              className="appearance-none rounded-lg rounded-r-none py-2 px-3 w-4/5 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-inner"
              type="text"
              id="customEnding"
              maxLength={20}
              placeholder="tiny.kntp.pl/CustomEnding"
              {...register('optionalEnding')}
            />
            <button
              className={`bg-gray-700 w-fit md:w-1/5 rounded-r-lg text-gray-200 ${
                errors.optionalEnding && 'text-red-500'
              } hover:text-gray-300 transition-colors border-l-2 border-gray-600 px-2 md:px-0`}
              type="button"
              onClick={() => checkIfAvailable()}
              disabled={loading}
            >
              {loading ? <Loader /> : 'Available?'}
            </button>
          </div>
          {errors.optionalEnding && (
            <span className="text-red-500 text-sm">
              {errors.optionalEnding.message}
            </span>
          )}
        </div>
        <div className="my-4 flex justify-between md:text-xl">
          <span>Your short link will be:</span>
          <span>tiny.kntp.pl/test_link_kntp</span>
        </div>
        <div>
          <input
            className="bg-white rounded-md font-semibold text-gray-700 py-2 w-full hover:bg-slate-200 hover:text-black transition-colors cursor-pointer"
            type="submit"
            value="Make it tiny!"
            disabled={!available || loading}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
