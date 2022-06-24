import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import debounce from 'debounce';
import Loader from './Loader';

type Inputs = {
  longUrl: string;
  optionalEnding: string;
};

const expr =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const urlRegex = new RegExp(expr);

const schema = z.object({
  longUrl: z
    .string()
    .min(1, { message: 'Field is required' })
    .regex(urlRegex, { message: 'Not a valid url' }),
  optionalEnding: z
    .string()
    .min(3, { message: 'Minimum 3 characters or empty' })
    .max(20, { message: 'Maximum 20 characters' })
    .optional()
    .or(z.literal('')),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [ending, setEnding] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEndingChange = (value: string) => {
    const testData = 'okokok';
    if (testData === value) {
      setEnding(value);
    } else {
      setEnding('');
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log('ending', ending);
    console.log('loading', loading);
  }, [ending, loading]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
            Optional: Your own custom ending [up to 20 characters]
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
              onChange={debounce(
                (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleEndingChange(e.target.value),
                1000
              )}
              onKeyUp={() => setLoading(true)}
            />

            <div className="bg-gray-700 w-fit md:w-1/5 rounded-r-lg transition-colors px-2 md:px-2 flex items-center justify-end">
              {loading && ending === '' && <Loader />}
              {!loading && ending !== '' && (
                <span className="text-green-500 mr-2">&#10004;</span>
              )}
            </div>
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
            className="bg-white rounded-md font-semibold text-black py-2 w-full hover:bg-slate-200 transition-colors cursor-pointer"
            type="submit"
            value="Make it tiny!"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
