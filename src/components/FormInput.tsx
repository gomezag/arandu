
interface FormInputProps {
    handleChange: () => void,
    value?: any;
}


const FormInput =({value, })=> {

return (            
    <label className="block text-left">
        {t('upload.sculptureId')}
        <input
        type="text"
        name="sculptureId"
        placeholder="Sculpture ID"
        value={formData.sculptureId}
        onChange={handleChange}
        className={`w-full p-2 border border-gray-300 rounded mt-1 ${sculpture ? 'bg-gray-200' : ''}`}
        required
        disabled={!!sculpture}
        />
    </label>
)};

export default FormInput