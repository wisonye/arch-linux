# Debugging C/C++

Install:

```bash
doas pacman --sync --refresh lldb
```

</br>

Before you're able to use `lldb` to debug your program, you need to compile your
project in `debug mode` which means:

- Use the `-g` flag on `clang/clang++` to compile your source code

- Or use `-DCMAKE_BUILD_TYPE=Debug` env var to call `cmake` to generate the
`Makefile` of your project

After that, you can use `lldb` to launch the compiled binary like this:

```bash
lldb ./YOUR_BINARY
```

</br>

### Basic usage

- Launch your program and create (debug) target

    ```bash
    lldb c_demo_pointer

    # (lldb) target create "c_demo_pointer"
    # Current executable set to '/Users/wison/CPP/c-tutorial/build/c_demo_pointer' (x86_64).
    ```

    When your program stops when debugging (because of your code causes the
    program to crash), and you want to re-run it again, just type `run`:

    ```bash
    [ C Pointer Demo ]

    #
    # Program crash and stop at line 8 with the error shows up
    #
    Process 42774 stopped
    * thread #1, queue = 'com.apple.main-thread', stop reason = EXC_BAD_ACCESS (code=1, address=0x0)
        frame #0: 0x0000000100003f70 c_demo_pointer`main at pointer_demo.c:8:10
       5        printf("\n[ C Pointer Demo ]\n");
       6
       7        char *ptr = NULL;
    -> 8        *ptr = "abc";
       9
       10       return 0;
       11   }
    Likely cause: ptr accessed 0x0

    #
    # Then run again if you want to debug again, it should stop at the first
    # breakpoint again (if you don't delete it)
    #
    (lldb) run
    There is a running process, kill it and restart?: [Y/n]
    Process 42774 exited with status = 9 (0x00000009)
    Process 42784 launched: '/Users/wison/CPP/c-tutorial/build/c_demo_pointer' (x86_64)
    Process 42784 stopped
    * thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
        frame #0: 0x0000000100003f4f c_demo_pointer`main at pointer_demo.c:5:5
       2    #include <string.h>
       3
       4    int main() {
    -> 5        printf("\n[ C Pointer Demo ]\n");
       6
       7        char *ptr = NULL;
       8        *ptr = "abc";
    ```

    </br>


- Launch other program without exiting current `lldb` instance

    If you want to debug another program at the same time, just create another
    debug target like this:

    ```bash
    (lldb) target create c_demo_string
    # Current executable set to '/Users/wison/CPP/c-tutorial/build/c_demo_string' (x86_64).
    ```

    </br>

    You can list all created debug targets like this:

    ```bash
    target list
    # Current targets:
    #   target #0: /Users/wison/CPP/c-tutorial/build/c_demo_pointer ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=42647, state=stopped )
    #   target #1: /Users/wison/CPP/c-tutorial/build/c_demo_struct ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=42704, state=exited )
    #   target #2: /Users/wison/CPP/c-tutorial/build/c_demo_pointer ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=42784, state=stopped )
    # * target #3: /Users/wison/CPP/c-tutorial/build/c_demo_string ( arch=x86_64-apple-macosx11.0.0, platform=host )
    ```

    </br>

    And select (switch to) another target:

    ```bash
    (lldb) target select 2
    # Current targets:
    #   target #0: /Users/wison/CPP/c-tutorial/build/c_demo_pointer ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=42647, state=stopped )
    #   target #1: /Users/wison/CPP/c-tutorial/build/c_demo_struct ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=42704, state=exited )
    # * target #2: /Users/wison/CPP/c-tutorial/build/c_demo_pointer ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=42784, state=stopped )
    #   target #3: /Users/wison/CPP/c-tutorial/build/c_demo_string ( arch=x86_64-apple-macosx11.0.0, platform=host, pid=43027, state=exited )
    (lldb) run
    ```

    </br>

- How to set a breakpoint and start debugging

    The original command is `break -f FILE_NAME -l LINE_NO`, but you can use `b`
    instead of the entire long command.

    `b` accepts FILE_NAME or FUNCTION_NAME or LINE_NO or combination.

    Here are the shortcut example:

    - `b main`: Set breakpoint at current file `main` function

    - `b 20`: Set breakpoint at current file line 20

    - `b main.cpp : 20`: Set breakpoint at `main.cpp` file line 20

    Tips: You can use `tab` to list file name or symbol names:)

    </br>

    ```bash
    (lldb) b main
    # Breakpoint 4: where = c_demo_pointer`main + 15 at pointer_demo.c:5:5, address = 0x0000000100003f4f
    ```

    Then you can run `main()` and stop at the first line:

    ```bash
    (lldb) run

    # There is a running process, kill it and restart?: [Y/n] Y
    # Process 43037 exited with status = 9 (0x00000009)
    # Process 43174 launched: '/Users/wison/CPP/c-tutorial/build/c_demo_pointer' (x86_64)
    # Process 43174 stopped
    # * thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 3.1
    # frame #0: 0x0000000100003f40 c_demo_pointer`main at pointer_demo.c:4
    # 1    #include <stdio.h>
    # 2    #include <string.h>
    # 3
    # -> 4    int main() {
    #     5        printf("\n[ C Pointer Demo ]\n");
    #     6
    #         7        char *ptr = NULL;
    #     (lldb)
    ```

    </br>

- How to debug

    You can do the following shortcuts for different purposes:

    - `s`: Step into
    - `n`: Next (step out)
    - `f`: Show the current position and source block
    - `v`: Show current stack frame variables (same with `fr v`)
    - `v -f X`: Show current stack frame variables in HEX format (same with `fr v -f X`)
    - `fr v`: Show variables for the current stack frame. Defaults to all
    arguments and local variables in scope.
    - `p VAR_NAME`: Print the given variable
    - `fin`: Finish current function call and return the outer function
    - `c`: Continue running until hit another breakpoint
    - `k`: Kill the current debugging process (before you re-run again)
    - `quit`: Quick current `lldb` instance

    </br>

- How to list stack frames and jump between stack frames

    `bt` (bracktrace) list the entire stack frame list (`frame #0`) is your
    current function stack frame:

    ```bash
    (lldb) bt
    # * thread #1, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    #   * frame #0: 0x0000000100003bdc fion-c-tutorial`copy_string(from_str="Text Data 2:)") at main.cpp:6:29
    #     frame #1: 0x0000000100003cb6 fion-c-tutorial`main at main.cpp:21:29
    #     frame #2: 0x00007fff204faf3d libdyld.dylib`start + 1
    #     frame #3: 0x00007fff204faf3d libdyld.dylib`start + 1
    ```

    </br>

    For example, you want to go back to the `main stack frame #1` to list all
    variables, you can do:

    ```bash
    # Same with `f 1`
    (lldb) frame select 1
    #frame #1: 0x0000000100003cb6 fion-c-tutorial`main at main.cpp:21:29
    #   18       char *copied_string = copy_string(text_data);
    #   19
    #   20       char text_data_2[] = "Text Data 2:)";
    #-> 21       char *copied_string_2 = copy_string(text_data_2);
    #   22
    #   23       printf("\n>>> copied_string: %s, len: %lu", copied_string,
    #   24              strlen(copied_string));
    (lldb) v
    # (char[12]) text_data = "Text Data:)"
    # (char *) copied_string = 0x0000000100304080 "Text Data:)"
    # (char[14]) text_data_2 = "Text Data 2:)"
    # (char *) copied_string_2 = 0x0000000000000000
    ```

    </br>

    After that, you can go back to your current function call stack frame (`#0`):

    ```bash
    # Same with `f 0`
    (lldb) frame select 0
    # frame #0: 0x0000000100003bdc fion-c-tutorial`copy_string(from_str="Text Data 2:)") at main.cpp:6:29
    #    3    #include <string.h>
    #    4
    #    5    char *copy_string(const char *from_str) {
    # -> 6        size_t str_len = strlen(from_str);
    #    7        char *copy_buffer = (char *)malloc(sizeof(char) * str_len);
    #    8
    #    9        for (size_t index = 0; index < str_len; index++) {
    ```

    </br>

- About how to run expression when debugging

    Use `p` to run a expression

    ```bash
    # * thread #1, queue = 'com.apple.main-thread', stop reason = step over
    #     frame #0: 0x0000000100003c10 fion-c-tutorial`copy_string(from_str="Text Data:)") at main.cpp:10:30
    #    7        char *copy_buffer = (char *)malloc(sizeof(char) * str_len);
    #    8
    #    9        for (size_t index = 0; index < str_len; index++) {
    # -> 10           copy_buffer[index] = from_str[index];
    #    11       }
    #    12
    #    13       return copy_buffer;

    (lldb) p copy_buffer[0]
    (char) $23 = 'T'
    (lldb) p copy_buffer[1]
    (char) $24 = '\0'
    ```

    </br>

    - Missing return size

        But if you try to run some functions that needs the data type, then you might
        see the following error:

        ```bash
        (lldb) p  strlen(copy_buffer)
        # error: expression failed to parse:
        # error: <user expression 37>:1:1: 'strlen' has unknown return type; cast the call to its declared return type
        # strlen(copy_buffer)
        ```

        </br>

        That means you should tell `lldb` know what data type (how many bytes) to
        store the return value:

        ```bash
        (lldb) p (size_t) strlen(from_str)
        # (size_t) $25 = 11
        (lldb) p (size_t) strlen(copy_buffer)
        # (size_t) $26 = 1
        ```

        </br>

    - Use different format to print value
        You can use the following command to change the default data type
        output format:

        `type format add -f {FORMAT_NAME} {TARGET_TYPE}`

        </br>

        ```bash
        #
        # Use `decimal` to print out `uint8_t`
        #
        (lldb) type format add -f d uint8_t
        (lldb) p ((Person *)element)->age
        (u8) $20 = 99

        #
        # Use `Uppercase Hex` to print out `uint8_t`
        #
        (lldb) type format add -f X uint8_t
        (lldb) p ((Person *)element)->age
        (u8) $21 = 0x63

        #
        # Use `Character` to print out `uint8_t`
        #
        (lldb) type format add -f c uint8_t
        (lldb) p ((Person *)element)->age
        (u8) $22 = 'c'
        ```

        </br>

        Here is the supported `format name`:

        ```bash
        "default"
        'B' or "boolean"
        'b' or "binary"
        'y' or "bytes"
        'Y' or "bytes with ASCII"
        'c' or "character"
        'C' or "printable character"
        'F' or "complex float"
        's' or "c-string"
        'd' or "decimal"
        'E' or "enumeration"
        'x' or "hex"
        'X' or "uppercase hex"
        'f' or "float"
        'o' or "octal"
        'O' or "OSType"
        'U' or "unicode16"
        "unicode32"
        'u' or "unsigned decimal"
        'p' or "pointer"
        "char[]"
        "int8_t[]"
        "uint8_t[]"
        "int16_t[]"
        "uint16_t[]"
        "int32_t[]"
        "uint32_t[]"
        "int64_t[]"
        "uint64_t[]"
        "float16[]"
        "float32[]"
        "float64[]"
        "uint128_t[]"
        'I' or "complex integer"
        'a' or "character array"
        'A' or "address"
        "hex float"
        'i' or "instruction"
        'v' or "void"
        'u' or "unicode8"
        ```

        </br>


    - How to print array:

        Use `parray {PRINT_ELEMENT_COUNT} {ARRAY_PTR}` to print any type of arrays:

        Assumer`self->data` is a `void *`, then you can cast it to any pointer
        and print the array:

        ```bash
        # Treat it as `int []` and print 2 element
        (lldb) parray 2 (int *)self->data
        (int *) $2 = 0x00000008276fa0d8 {
        (int) [0] = 10
        (int) [1] = -1515870811
        }

        # Treat it as `int []` and print 5 element
        (lldb) parray 5 (int *)self->data
        (int *) $3 = 0x00000008276fa0d8 {
        (int) [0] = 10
        (int) [1] = -1515870811
        (int) [2] = 1
        (int) [3] = 0
        (int) [4] = 1
        }

        # Treat it as `char []` and print 4 element
        (lldb) parray 5 (char *)self->data
        (char *) $4 = 0x00000008276fa0d8 "\n" {
        (char) [0] = '\n'
        (char) [1] = '\0'
        (char) [2] = '\0'
        (char) [3] = '\0'
        (char) [4] = '\xa5'
        }
        ```

        </br>

    - How to print memory data:

        Use `memory read` to print memory:

        ```bash
        #
        # --size `sizeof(int)`: Byte size of each memory chunk, use `` to run expression
        # --count 2: Show 2 items (memory chunks)
        # --format X: Show bytes as Hex (uppercase)
        # `self->data`: Read memory from this address
        #
        (lldb) memory read --size `sizeof(int)` --count 2 --format X `self->data`
        0x8276fa0d8: 0x0000000A
        0x8276fa0dc: 0xA5A5A5A5

        #
        # This is the shortcut, same with above
        #
        (lldb) memory read -s4 -c2 -fX `self->data`
        0x8276fa0d8: 0x0000000A
        0x8276fa0dc: 0xA5A5A5A5
        ```

        </br>


        Sample to print the custom struct:

        ```c
        typedef struct {
            char first_name[10];
            char last_name[10];
            u8 age;
        } Person;

        Person wison = {.first_name = "Wison", .last_name = "Ye", .age = 88};
        Person fion = {.first_name = "Fion", .last_name = "Li", .age = 99};
        ```

        </br>

        ```bash
        memory read -s `sizeof(Person)` -c2 -fX `self->items`
        # 0x827c1c090: 0x580000000000000000655900000000006E6F736957
        # 0x827c1c0a5: 0x630000000000000000694C0000000000006E6F6946
        ```

        `58`: wison.age

        `00000000000000006559`: wison.last_name

        `00000000006E6F736957`: wison.first_name

        </br>

        `63`: fion.age

        `0000000000000000694C`: fion.last_name

        `0000000000006E6F6946`: fion.first_name

        </br>


    - How to use `printf` to print realtime stuff:

        You need to use `p (void) printf()` to run a realtime `printf` function
        when debugging:


        ```
        (lldb) p (void) printf("\n>>> hello\n")

        >>> hello
        ```

        Pay attention:

        If you didn't see any output after calling any `printf` (no matter call
        makes in your source code or by running `p (void) printf()`), that's 
        because the `printf()` doesn't emmit a `\n` yet.

        In that case, you need to flush the `stdout` buffer by running the
        following command:

        ```
        p (void) fflush(0)
        ```

        Right now, you should see the previous `printf` content:)

        </br>

        One more case, if you try to `printf` a pointer that return from `malloc`,
        then you have to add the `&` to that pointer variable. Otherwise, it
        just print the content that `malloc` pointer points to:

        ```bash
        # 74       if (temp_len > 0) {
        # 75           this->_buffer = new char[temp_len + 1];
        # 76           memcpy(this->_buffer, other_str, temp_len);
        # -> 77           this->_buffer[temp_len] = '\0';
        # 78

        (lldb) v this->_buffer
        (char *) this->_buffer = 0x00000001002053f0 "Wison"

        (lldb) p (void) printf("this->_buffer address: %p\n", this->_buffer)
        # this->_buffer address: 0x1002053f0
        ```

        As, you can see above, `lldb` can't print the local stack variable's
        pointer (return by `malloc`). It alwasy print the pointer that points
        to the `Wison` static string locates at `static` memory area (lower
        address)

        So you have to add the `&` explicitly to print the local stack variable's
        address (higher address):

        ```bash
        (lldb) p (void) printf("this->_buffer address: %p\n", &this->_buffer)
        # this->_buffer address: 0x7ffeefbfeef8
        ```

        </br>


- How to manage breakpoints

    - `br list`: List all breakpoints

    - `br del`: Delete all breakpoints

    - `br del BREAKPOINT_NO`: Delete the given breakpoint

    </br>

- Use `gui`

    After created debug target and set a breakpoint (e.g. `b main`), type `gui`
    to launch the LLDB GUI for convenient debugging:

    ![lldb-gui](./images/lldb-gui.png) 

    - `Tab`: Switch between panels
    - `LLDB (F1) -> Exit`: Exit current `gui`
    - `up/down`: Switch vars in `Variables` panel
    - `right`: Expand var to see value in `Variables` panel

    </br>

