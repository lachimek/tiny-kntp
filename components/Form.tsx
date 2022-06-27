import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import Loader from './Loader';
import { trpc } from '../utils/trpc';
import { formSchema } from '../shared/form.schema';

type Inputs = {
  longUrl: string;
  customEnding: string;
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
    defaultValues: { longUrl: '', customEnding: '' },
    resolver: zodResolver(formSchema),
  });

  const createTinyLink = trpc.useMutation('create-tiny-link');
  const checkIfEndingTaken = trpc.useMutation('check-if-taken');

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [available, setAvailable] = useState(false);

  const checkIfAvailable = async () => {
    const value = getValues('customEnding');
    console.log(value);
    setChecked(true);
    if (value.length < 3) {
      setError('customEnding', {
        type: 'manual',
        message: 'Minimum 3 characters or empty',
      });
      return;
    }

    setLoading(true);
    const response = await checkIfEndingTaken.mutateAsync({
      customEnding: value,
    });
    clearErrors('customEnding');
    if (response.ok) {
      setAvailable(true);
      setLoading(false);
      toast.success('Your custom ending is available.');
    } else if (!response.ok) {
      setAvailable(false);
      setLoading(false);
      setError('customEnding', {
        type: 'custom',
        message: 'Ending already taken',
      });
      toast.error('Your custom ending is already taken.');
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!checked) {
      console.log('Please check if ending is available');
      setError('customEnding', {
        type: 'custom',
        message: 'Please check if ending is available',
      });
      toast.error('Please check if ending is available', {
        toastId: 'check_if_taken_error',
      });
    } else {
      const response = await createTinyLink.mutateAsync(data);
      console.log(response);
      setChecked(false);
      setAvailable(false);
      reset();
      toast.success('Your tiny link has been created');
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
            Your own custom ending [3 to 20 characters]
          </label>
          <div
            className={`w-full flex ${
              errors.customEnding && 'border-[1px] border-red-500 rounded-lg'
            }
            ${
              available && checked && 'border-[1px] border-green-500 rounded-lg'
            }
            `}
          >
            <input
              className="appearance-none rounded-lg rounded-r-none py-2 px-3 w-4/5 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-inner"
              type="text"
              id="customEnding"
              maxLength={20}
              placeholder="tiny.kntp.pl/CustomEnding"
              {...register('customEnding')}
              onChange={() => {
                setAvailable(false);
                setChecked(false);
              }}
            />
            <button
              className={`bg-gray-700 w-fit md:w-1/5 rounded-r-lg text-gray-200 ${
                errors.customEnding && 'text-red-500'
              } ${
                available && checked && 'text-green-500'
              } hover:text-gray-300 transition-colors border-l-2 border-gray-600 px-2 md:px-0`}
              type="button"
              onClick={() => checkIfAvailable()}
              disabled={loading}
            >
              {loading ? <Loader /> : 'Available?'}
            </button>
          </div>
          {errors.customEnding && (
            <span className="text-red-500 text-sm">
              {errors.customEnding.message}
            </span>
          )}
        </div>
        <div className="my-4 flex justify-between md:text-xl">
          <span>Your short link will be:</span>
          <span>tiny.kntp.pl/{getValues('customEnding') || '???'}</span>
        </div>
        <div>
          <input
            className="bg-white rounded-md font-semibold text-gray-700 py-2 w-full hover:bg-slate-200 hover:text-black transition-colors cursor-pointer"
            type="submit"
            value="Make it tiny!"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
