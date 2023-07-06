namespace ApiControlCenterWebPanel.Controller
{
    public class KeyExecuter
    {
        public string GenerateHexKey()
        {
            Random random = new();
            string hexKey = string.Empty;
            int countA = 0;
            int count8 = 0;
            bool has7 = false;
            int count5 = 0;
            int count4 = 0;
            int count1 = 0;

            while (true)
            {
                string randomHexDigit = random.Next(16).ToString("X");
                hexKey += randomHexDigit;

                switch (randomHexDigit)
                {
                    case "A":
                        countA++;
                        break;
                    case "8":
                        count8++;
                        break;
                    case "7":
                        has7 = true;
                        break;
                    case "5":
                        count5++;
                        break;
                    case "4":
                        count4++;
                        break;
                    case "1":
                        count1++;
                        break;
                }

                if (countA > 6 && count8 > 2)
                {
                    hexKey = hexKey.Substring(0, hexKey.Length - 1); // Remove the last digit
                    countA--;
                    count8--;
                }

                if (has7 && count5 < 2)
                {
                    hexKey = hexKey.Substring(0, hexKey.Length - 1); // Remove the last digit
                    has7 = false;
                }

                if (count4 > 0 && count1 == 0)
                {
                    hexKey = hexKey.Substring(0, hexKey.Length - 1); // Remove the last digit
                    count4--;
                }

                if (hexKey.Length >= 8)
                    break;
            }

            return hexKey;
        }

        public bool CheckKeyConditions(string key)
        {
            if (string.IsNullOrEmpty(key)) 
            {
                return false;
            }

            int countA = 0;
            int count8 = 0;
            bool has7 = false;
            int count5 = 0;
            int count4 = 0;
            int count1 = 0;

            foreach (char c in key)
            {
                switch (c)
                {
                    case 'A':
                        countA++;
                        break;
                    case '8':
                        count8++;
                        break;
                    case '7':
                        has7 = true;
                        break;
                    case '5':
                        count5++;
                        break;
                    case '4':
                        count4++;
                        break;
                    case '1':
                        count1++;
                        break;
                }
            }

            if (countA > 6 && count8 > 2)
                return false;

            if (has7 && count5 < 2)
                return false;

            if (count4 > 0 && count1 == 0)
                return false;

            return true;
        }
    }
}
