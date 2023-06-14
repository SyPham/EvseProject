using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using NetUtility;
using Newtonsoft.Json;

namespace Evse.Helpers
{
    public static class MyUtility
    {
        
        /// <summary>
        /// Chuyển đổi giá trị value thành dạng _file 
        /// trả về giá trị dạng _file
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi</param>
        /// <param name="isTrim">Có tự động cắt khoảng trắng 2 đầu không? True: có; false: không
        /// </param><returns>Giá trị cần chuyển đổi</returns>
        public static string ToFileFormat(this object value, bool isTrim = false)
        {
            if (value == null)
            {
                return string.Empty;
            }

            string result = value.ToString().ToLower().ToNoSignFormat();

            result = ToNoSignFormat(result, isTrim);
            result = result.Replace(" ", "_");
            return result;
        }
        /// <summary>
        /// Chuyển đổi value thành không dấu
        /// trả về giá trị value không dấu
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi</param>
        /// <param name="isTrim">Có tự động cắt khoảng trắng 2 đầu không? True: có; false: không
        /// </param>
        /// <returns>trả về giá trị value không dấu</returns>
        public static string ToNoSignFormat(this object value, bool isTrim = false)
        {
            if (value == null)
            {
                return string.Empty;
            }
            string result = value.ToString();
            if (isTrim)
                result = result.Trim();
            //result = Regex.Replace(result, "[óòỏõọôốồổỗộơớờởỡợ]", "o");
            //result = Regex.Replace(result, "[óòỏõọôốồổỗộơớờởỡợ]".ToUpper(), "O");

            //Giúp bỏ dấu tiếng việt
            result = result.Normalize(NormalizationForm.FormD);
            result = Regex.Replace(result, "\\p{IsCombiningDiacriticalMarks}+", String.Empty);
            result = result.Replace('\u0111', 'd').Replace('\u0110', 'D');

            return result;
        }
                public static List<string> GetRolesValue(this ClaimsPrincipal user)
        {
           return user.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x=>x.Value).ToList();
        }
         public static int GetUserId(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier).Value.ToInt();
        }
        public static string ToJsonString(this object value)
        {
            if (value == null)
            {
                return string.Empty;
            }

            return JsonConvert.SerializeObject(value);
        }
        private static readonly string _Salt = "K6KVX-6NWTF-2JPJ3-Q29H6-H8RC6";
        public static string ToEncryptPassword(this string password)
        {
            if (string.IsNullOrEmpty(password)) return "";
            var ASCIIENC = new ASCIIEncoding();
            string strreturn;
            strreturn = string.Empty;
            var bytesourcetxt = ASCIIENC.GetBytes(password);
            var SHA1Hash = new SHA1CryptoServiceProvider();
            byte[] bytehash = SHA1Hash.ComputeHash(bytesourcetxt);
            foreach (byte b in bytehash)
                strreturn += b.ToString("X2");
            return strreturn;
        }

        public static string ToEncrypt(this string password, string salt = "")
        {
            if (string.IsNullOrEmpty(salt))
                salt = _Salt;
            var data = Encoding.UTF8.GetBytes(password);

            using (var md5 = new MD5CryptoServiceProvider())
            {
                var keys = md5.ComputeHash(Encoding.UTF8.GetBytes(salt));
                using (var tripDes = new TripleDESCryptoServiceProvider { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    var transform = tripDes.CreateEncryptor();
                    var results = transform.TransformFinalBlock(data, 0, data.Length);
                    return Convert.ToBase64String(results, 0, results.Length);
                }
            }
        }
        public static Guid? ToGuidNullable(this string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }

            try
            {
                Guid result;
                Guid.TryParse(value, out result);
                return result;
            }
            catch
            {
              return null;
            }
        }
         public static Guid ToGuid(this string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return Guid.Empty;
            }

            try
            {
                Guid result;
                Guid.TryParse(value, out result);
                return result;
            }
            catch
            {
              return Guid.Empty;
            }
        }
        public static bool IsBase64(this string base64String)
        {
            if (base64String.Replace(" ", "").Length % 4 != 0)
            {
                return false;
            }

            try
            {
                Convert.FromBase64String(base64String);
                return true;
            }
            catch
            {
                // Handle the exception
            }
            return false;
        }
        public static string ToDecrypt(this string password, string salt = "")
        {
            if (string.IsNullOrEmpty(salt))
                salt = _Salt;
            var data = Convert.FromBase64String(password);
            using (var md5 = new MD5CryptoServiceProvider())
            {
                var keys = md5.ComputeHash(Encoding.UTF8.GetBytes(salt));

                using (var tripDes = new TripleDESCryptoServiceProvider()
                {
                    Key = keys,
                    Mode = CipherMode.ECB,
                    Padding = PaddingMode.PKCS7
                })
                {
                    var transform = tripDes.CreateDecryptor();
                    var results = transform.TransformFinalBlock(data, 0, data.Length);
                    return Encoding.UTF8.GetString(results);
                }
            }
        }

        public static string ToSha256(this string inputString)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString + _Salt);
            byte[] hash = sha256.ComputeHash(bytes);
            return hash.GetStringFromHash();
        }

        public static string ToSha512(this string inputString)
        {
            SHA512 sha512 = SHA512.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(inputString + _Salt);
            byte[] hash = sha512.ComputeHash(bytes);
            return hash.GetStringFromHash();
        }

        public static bool VerifyHashedPassword(this string pass, string confirmPass)
        {
            byte[] array1 = Encoding.UTF8.GetBytes(pass);
            byte[] array2 = Encoding.UTF8.GetBytes(confirmPass);
            if (array1.Length != array2.Length)
            {
                return false;
            }

            for (int i = 0; i < array1.Length; i++)
            {
                if (array1[i] != array2[i])
                {
                    return false;
                }
            }
            return true;
        }
        private static string GetStringFromHash(this byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }
        private static byte[] GenerateSaltedHash(this byte[] plainText, byte[] salt)
        {
            HashAlgorithm algorithm = new SHA256Managed();
            StringBuilder result = new StringBuilder();
            byte[] plainTextWithSaltBytes =
              new byte[plainText.Length + salt.Length];

            for (int i = 0; i < plainText.Length; i++)
            {
                plainTextWithSaltBytes[i] = plainText[i];
            }
            for (int i = 0; i < salt.Length; i++)
            {
                plainTextWithSaltBytes[plainText.Length + i] = salt[i];
            }

            return algorithm.ComputeHash(plainTextWithSaltBytes);
        }

    }

      public class TreeObject
    {
        public object ID { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Image { get; set; } = "";
        public string CssClass { get; set; } = "ngx-org-ceo";
        public Guid Guid { get; set; }
        public Guid? ParentId { get; set; }
        public string Pig_No { get; set; }
        public string Pig_GUID { get; set; }
        public string Parent_GUID { get; set; }
        public string MakeOrder_GUID { get; set; }
        public string Comment { get; set; }
        public bool HasChildren
        {
            get { return Childs.Any(); }
        }
        public IList<TreeObject> Childs { get; set; } = new List<TreeObject>();
        public static List<Guid> GetParents(Dictionary<object, TreeObject> lookup, TreeObject lookFor)
        {
            var list = new List<Guid> { };
            while (lookFor != null)
            {
                if (lookFor.ParentId == null)
                    break;
                // cast ParentId to corrent dataType here Guid or int
                lookup.TryGetValue((Guid)lookFor.ParentId, out var parentNode);
                lookFor = parentNode;
                if (parentNode == null)
                    break;
                list.Add((Guid)lookFor.ParentId);
            }
            return list;
        }

    }
    public static class TreeExtension
    {
        public static IEnumerable<TreeObject> FlatToHierarchy(this List<TreeObject> list)
        {
            // hashtable lookup that allows us to grab references to containers based on id
            var lookup = new Dictionary<object, TreeObject>();
            // actual nested collection to return
            var nested = new List<TreeObject>();

            foreach (TreeObject item in list)
            {
                if (item.ParentId != null && lookup.ContainsKey(item.ParentId))
                {
                    // add to the parent's child list 
                    lookup[item.ParentId].Childs.Add(item);
                }
                else
                {
                    // no parent added yet (or this is the first time)
                    nested.Add(item);
                }
                lookup.Add(item.Guid, item);
            }

            return nested;
        }
    }

}
