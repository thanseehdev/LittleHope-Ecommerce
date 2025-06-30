import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="w-full">
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={phone => setPhone(phone)}
        inputClass="!w-full !py-2 !pl-12 !border-gray-300"
        containerClass="!w-full"
        buttonClass="!bg-gray-100"
      />

      <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-base inline-flex items-center justify-center gap-2">
        <i className="fas fa-phone text-lg"></i> Sign up with Mobile Number
      </button>
    </div>
  );
};


